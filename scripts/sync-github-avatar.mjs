import { createHash, randomUUID } from 'node:crypto'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const LOGIN = 'sl4dk1y'
const MAX_SOURCE_BYTES = 8 * 1024 * 1024
const MAX_WEBP_BYTES = 2 * 1024 * 1024

function fail(message) {
  throw new Error(message)
}

function validateImage(bytes, contentType) {
  const mime = contentType?.split(';', 1)[0]?.trim().toLowerCase()
  const valid = (mime === 'image/jpeg' && bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])))
    || (mime === 'image/png' && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    || (mime === 'image/webp' && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP')
  if (!valid) fail('Avatar response did not contain a supported image.')
}

async function readLimited(response, maxBytes) {
  const announcedSize = Number(response.headers.get('content-length'))
  if (Number.isFinite(announcedSize) && announcedSize > maxBytes) fail('Avatar response exceeded the size limit.')
  if (!response.body) fail('Avatar response was empty.')
  const reader = response.body.getReader()
  const chunks = []
  let size = 0
  try {
    while (true) {
      const result = await reader.read()
      if (result.done) break
      size += result.value.byteLength
      if (size > maxBytes) {
        await reader.cancel()
        fail('Avatar response exceeded the size limit.')
      }
      chunks.push(Buffer.from(result.value))
    }
  } finally {
    reader.releaseLock()
  }
  if (size === 0) fail('Avatar response was empty.')
  return Buffer.concat(chunks, size)
}

async function defaultEncode(inputPath, outputPath) {
  await new Promise((resolve, reject) => {
    const child = spawn('cwebp', [
      '-quiet', '-q', '88', '-m', '6', '-resize', '320', '0', '-metadata', 'icc',
      inputPath, '-o', outputPath,
    ], { stdio: 'ignore' })
    child.once('error', () => reject(new Error('The WebP encoder could not be started.')))
    child.once('close', (code) => code === 0 ? resolve() : reject(new Error('The WebP encoder failed.')))
  })
}

function isWebp(bytes) {
  return bytes.length >= 12 && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP'
}

function parseState(content) {
  const trimmed = content.trim()
  if (!trimmed) return { current: null, previous: null }
  if (/^[a-f0-9]{64}$/.test(trimmed)) return { current: trimmed, previous: null }
  const fields = Object.fromEntries(trimmed.split(/\r?\n/).map((line) => {
    const separator = line.indexOf('=')
    return separator < 0 ? [line, null] : [line.slice(0, separator), line.slice(separator + 1)]
  }))
  if (!fields.current || !/^[a-f0-9]{64}$/.test(fields.current)) fail('Avatar version state was invalid.')
  if (fields.previous && !/^[a-f0-9]{64}$/.test(fields.previous)) fail('Previous avatar version state was invalid.')
  const previous = fields.previous && fields.previous !== fields.current ? fields.previous : null
  return { current: fields.current, previous }
}

function serializeState(current, previous) {
  return 'current=' + current + '\nprevious=' + (previous || '') + '\n'
}

function avatarAssetPath(root, hash) {
  return path.join(root, 'public/images/github-avatar-' + hash + '.webp')
}

async function hasValidAvatar(root, hash) {
  if (!hash) return false
  try {
    const bytes = await readFile(avatarAssetPath(root, hash))
    return isWebp(bytes) && bytes.length <= MAX_WEBP_BYTES
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

async function syncedAvatarAssets(root) {
  const imageDirectory = path.join(root, 'public/images')
  const names = await readdir(imageDirectory)
  return names
    .filter((name) => /^github-avatar-[a-f0-9]{64}\.webp$/.test(name))
    .map((name) => path.join(imageDirectory, name))
}

async function writeAtomically(filePath, contents) {
  const temporaryPath = filePath + '.' + randomUUID() + '.tmp'
  try {
    await writeFile(temporaryPath, contents, { flag: 'wx' })
    await rename(temporaryPath, filePath)
  } finally {
    await rm(temporaryPath, { force: true })
  }
}

async function commitFileUpdates(updates) {
  const previous = new Map()
  const applied = []
  for (const [filePath] of updates) previous.set(filePath, await readFile(filePath))
  try {
    for (const [filePath, contents] of updates) {
      await writeAtomically(filePath, contents)
      applied.push(filePath)
    }
  } catch (error) {
    for (const filePath of applied.reverse()) {
      await writeAtomically(filePath, previous.get(filePath)).catch(() => {})
    }
    throw error
  }
}

export async function syncAvatar({ root, fetchImpl = fetch, encode = defaultEncode }) {
  const api = await fetchImpl('https://api.github.com/users/' + LOGIN, {
    headers: { accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28' },
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
  })
  if (!api.ok) fail('GitHub profile request failed with HTTP ' + api.status + '.')
  const profileType = api.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
  if (profileType !== 'application/json' && profileType !== 'application/vnd.github+json') fail('GitHub profile response had an unexpected content type.')
  let profile
  try {
    profile = JSON.parse((await readLimited(api, 64 * 1024)).toString('utf8'))
  } catch {
    fail('GitHub profile response was invalid.')
  }
  if (profile?.login !== LOGIN || typeof profile.avatar_url !== 'string') fail('GitHub profile identity could not be verified.')

  let avatarUrl
  try {
    avatarUrl = new URL(profile.avatar_url)
  } catch {
    fail('GitHub avatar URL was invalid.')
  }
  if (avatarUrl.protocol !== 'https:' || avatarUrl.hostname !== 'avatars.githubusercontent.com' || avatarUrl.port || avatarUrl.username || avatarUrl.password) {
    fail('GitHub avatar URL host was not allowed.')
  }
  const imageResponse = await fetchImpl(avatarUrl, {
    headers: { accept: 'image/avif,image/webp,image/png,image/jpeg' },
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
  })
  if (!imageResponse.ok) fail('GitHub avatar request failed with HTTP ' + imageResponse.status + '.')
  const sourceBytes = await readLimited(imageResponse, MAX_SOURCE_BYTES)
  validateImage(sourceBytes, imageResponse.headers.get('content-type'))
  const sourceHash = createHash('sha256').update(sourceBytes).digest('hex')
  const assetName = 'github-avatar-' + sourceHash + '.webp'
  const assetRelativePath = 'public/images/' + assetName
  const assetPath = path.join(root, assetRelativePath)
  const statePath = path.join(root, '.github/avatar-source.sha256')
  const portfolioPath = path.join(root, 'src/content/portfolio.ts')
  const htmlPath = path.join(root, 'index.html')
  const [stateContents, portfolio, html] = await Promise.all([
    readFile(statePath, 'utf8'), readFile(portfolioPath, 'utf8'), readFile(htmlPath, 'utf8'),
  ])
  const state = parseState(stateContents)
  let existingAsset
  try {
    existingAsset = await readFile(assetPath)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (existingAsset && (!isWebp(existingAsset) || existingAsset.length > MAX_WEBP_BYTES)) {
    fail('The existing versioned avatar asset was invalid.')
  }

  const profileAvatar = /^([\t ]*avatar:[\t ]*)'[^']*'/m
  const fallbackAvatar = /^([\t ]*avatarFallback:[\t ]*)'[^']*'/m
  if (!profileAvatar.test(portfolio) || !fallbackAvatar.test(portfolio)) fail('The profile avatar fields were not found.')
  const imageReference = /src="\/images\/github-avatar(?:-[a-f0-9]{64})?\.webp"/g
  let referenceCount = 0
  const updatedHtml = html.replace(imageReference, () => {
    referenceCount += 1
    return 'src="/images/' + assetName + '"'
  })
  if (referenceCount !== 2) fail('Expected exactly two static avatar references in index.html.')
  let previousHash
  if (state.current !== sourceHash && await hasValidAvatar(root, state.current)) {
    previousHash = state.current
  } else if (await hasValidAvatar(root, state.previous)) {
    previousHash = state.previous
  } else {
    previousHash = null
  }
  const fallbackPath = previousHash ? '/images/github-avatar-' + previousHash + '.webp' : ''
  const updatedPortfolio = portfolio
    .replace(profileAvatar, '$1' + "'/images/" + assetName + "'")
    .replace(fallbackAvatar, '$1' + "'" + fallbackPath + "'")
  if (!updatedPortfolio.includes("avatar: '/images/" + assetName + "'")) fail('The profile avatar field could not be updated safely.')
  const updatedState = serializeState(sourceHash, previousHash)
  const keepHashes = new Set([sourceHash, previousHash].filter(Boolean))
  const retiredAssets = (await syncedAvatarAssets(root))
    .filter((filePath) => !keepHashes.has(path.basename(filePath).slice('github-avatar-'.length, -'.webp'.length)))
  const retiredContents = new Map()
  for (const filePath of retiredAssets) retiredContents.set(filePath, await readFile(filePath))

  if (state.current === sourceHash
    && state.previous === previousHash
    && existingAsset
    && portfolio === updatedPortfolio
    && html === updatedHtml
    && stateContents === updatedState
    && retiredAssets.length === 0) {
    return { changed: false, asset: assetRelativePath, previous: previousHash ? 'public/images/github-avatar-' + previousHash + '.webp' : '', removed: [] }
  }

  let temporaryDirectory
  let createdAsset = false
  const updates = [
    [portfolioPath, updatedPortfolio],
    [htmlPath, updatedHtml],
    [statePath, updatedState],
  ]
  const previousContents = new Map()
  for (const [filePath] of updates) previousContents.set(filePath, await readFile(filePath))
  try {
    if (!existingAsset) {
      temporaryDirectory = await mkdtemp(path.join(path.dirname(assetPath), '.avatar-sync-'))
      const inputPath = path.join(temporaryDirectory, 'source-image')
      const outputPath = path.join(temporaryDirectory, 'avatar.webp')
      await writeFile(inputPath, sourceBytes, { flag: 'wx' })
      await encode(inputPath, outputPath)
      const webpBytes = await readFile(outputPath)
      if (!isWebp(webpBytes) || webpBytes.length > MAX_WEBP_BYTES) fail('WebP conversion output was invalid.')
      await rename(outputPath, assetPath)
      createdAsset = true
    }
    await commitFileUpdates(updates)
    const removed = []
    try {
      for (const filePath of retiredAssets) {
        await rm(filePath)
        removed.push(filePath)
      }
    } catch (error) {
      for (const filePath of removed) await writeAtomically(filePath, retiredContents.get(filePath)).catch(() => {})
      await commitFileUpdates(updates.map(([filePath]) => [filePath, previousContents.get(filePath)])).catch(() => {})
      throw error
    }
  } catch (error) {
    if (createdAsset) await rm(assetPath, { force: true }).catch(() => {})
    throw error
  } finally {
    if (temporaryDirectory) await rm(temporaryDirectory, { recursive: true, force: true })
  }
  return {
    changed: true,
    asset: assetRelativePath,
    previous: previousHash ? 'public/images/github-avatar-' + previousHash + '.webp' : '',
    removed: retiredAssets.map((filePath) => path.relative(root, filePath)),
  }
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  try {
    const result = await syncAvatar({ root })
    if (process.env.GITHUB_OUTPUT) {
      const removed = result.removed.length ? result.removed.join('\n') : ''
      const output = 'changed=' + result.changed + '\nasset=' + result.asset + '\nprevious=' + result.previous
        + '\nremoved<<AVATAR_SYNC_EOF\n' + removed + '\nAVATAR_SYNC_EOF\n'
      await writeFile(process.env.GITHUB_OUTPUT, output, { flag: 'a' })
    }
    process.stdout.write('Avatar synchronization ' + (result.changed ? 'updated' : 'unchanged') + '.\n')
  } catch (error) {
    process.stderr.write('Avatar synchronization failed: ' + (error instanceof Error ? error.message : 'unexpected error') + '\n')
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main()
