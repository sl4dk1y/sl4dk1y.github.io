import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { syncAvatar } from './sync-github-avatar.mjs'

const sourceBytes = Buffer.from([255, 216, 255, 1, 2, 3])
const sourceHash = createHash('sha256').update(sourceBytes).digest('hex')
const webpBytes = Buffer.from('RIFF\x04\x00\x00\x00WEBP', 'binary')
const priorHash = 'a'.repeat(64)
const olderHash = 'b'.repeat(64)
const photoB = Buffer.from([255, 216, 255, 10, 11, 12])
const photoC = Buffer.from([255, 216, 255, 20, 21, 22])
const photoD = Buffer.from([255, 216, 255, 30, 31, 32])

async function makeFixture(t, current = priorHash, previous = null, legacy = false) {
  const root = await mkdtemp(path.join(tmpdir(), 'avatar-sync-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, '.github'), { recursive: true })
  await mkdir(path.join(root, 'src/content'), { recursive: true })
  await mkdir(path.join(root, 'public/images'), { recursive: true })
  const currentPath = current ? '/images/github-avatar-' + current + '.webp' : '/images/github-avatar.webp'
  const previousPath = previous ? '/images/github-avatar-' + previous + '.webp' : ''
  const state = legacy ? (current || '') + '\n' : current ? 'current=' + current + '\nprevious=' + (previous || '') + '\n' : ''
  await writeFile(path.join(root, '.github/avatar-source.sha256'), state)
  await writeFile(path.join(root, 'src/content/portfolio.ts'), "export const profile = {\n  avatar: '" + currentPath + "',\n  avatarFallback: '" + previousPath + "',\n}\n")
  await writeFile(path.join(root, 'index.html'), '<img src="' + currentPath + '"><img src="' + currentPath + '">')
  await writeFile(path.join(root, 'public/images/github-avatar.webp'), webpBytes)
  if (current) await writeFile(path.join(root, 'public/images/github-avatar-' + current + '.webp'), webpBytes)
  if (previous) await writeFile(path.join(root, 'public/images/github-avatar-' + previous + '.webp'), webpBytes)
  return root
}

async function autoAvatarNames(root) {
  const names = await (await import('node:fs/promises')).readdir(path.join(root, 'public/images'))
  return names.filter((name) => /^github-avatar-[a-f0-9]{64}\.webp$/.test(name)).sort()
}

function mockFetch({ profileStatus = 200, imageStatus = 200, bytes = sourceBytes, contentType = 'image/jpeg' } = {}) {
  return async (url) => String(url).includes('api.github.com')
    ? new Response(JSON.stringify({ login: 'sl4dk1y', avatar_url: 'https://avatars.githubusercontent.com/u/123?v=4' }), { status: profileStatus, headers: { 'content-type': 'application/json' } })
    : new Response(bytes, { status: imageStatus, headers: { 'content-type': contentType } })
}

test('unchanged avatar creates no files and skips conversion', async (t) => {
  const root = await makeFixture(t, sourceHash)
  let conversions = 0
  const result = await syncAvatar({ root, fetchImpl: mockFetch(), encode: async () => { conversions += 1 } })
  assert.equal(result.changed, false)
  assert.equal(conversions, 0)
  assert.equal((await autoAvatarNames(root)).length, 1)
})

test('new avatar is encoded and updates only the avatar references', async (t) => {
  const root = await makeFixture(t)
  let conversions = 0
  const result = await syncAvatar({
    root,
    fetchImpl: mockFetch(),
    encode: async (_inputPath, outputPath) => {
      conversions += 1
      await writeFile(outputPath, webpBytes)
    },
  })
  assert.equal(result.changed, true)
  assert.equal(conversions, 1)
  assert.equal(result.asset, 'public/images/github-avatar-' + sourceHash + '.webp')
  assert.equal((await readFile(path.join(root, '.github/avatar-source.sha256'), 'utf8')), 'current=' + sourceHash + '\nprevious=' + priorHash + '\n')
  assert.equal((await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8')).split(sourceHash).length - 1, 1)
  assert.equal((await readFile(path.join(root, 'index.html'), 'utf8')).split(sourceHash).length - 1, 2)
  assert.equal((await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8')).includes('/images/github-avatar-' + priorHash + '.webp'), true)
  assert.deepEqual(await autoAvatarNames(root), ['github-avatar-' + priorHash + '.webp', 'github-avatar-' + sourceHash + '.webp'].sort())
})

test('HTTP errors leave existing state untouched', async (t) => {
  const root = await makeFixture(t)
  const before = await readFile(path.join(root, 'index.html'), 'utf8')
  await assert.rejects(syncAvatar({ root, fetchImpl: mockFetch({ profileStatus: 503 }) }), /HTTP 503/)
  assert.equal(await readFile(path.join(root, 'index.html'), 'utf8'), before)
})

test('invalid and oversized image responses fail before encoding', async (t) => {
  const root = await makeFixture(t)
  let conversions = 0
  await assert.rejects(syncAvatar({ root, fetchImpl: mockFetch({ bytes: Buffer.from('not an image') }), encode: async () => { conversions += 1 } }), /supported image/)
  await assert.rejects(syncAvatar({ root, fetchImpl: mockFetch({ contentType: 'text/plain' }), encode: async () => { conversions += 1 } }), /supported image/)
  const oversizedFetch = async (url, options) => {
    if (String(url).includes('api.github.com')) return mockFetch()(url, options)
    return new Response(new Uint8Array(1), { headers: { 'content-length': String(9 * 1024 * 1024), 'content-type': 'image/jpeg' } })
  }
  await assert.rejects(syncAvatar({ root, fetchImpl: oversizedFetch, encode: async () => { conversions += 1 } }), /size limit/)
  assert.equal(conversions, 0)
  assert.equal((await readFile(path.join(root, '.github/avatar-source.sha256'), 'utf8')), 'current=' + priorHash + '\nprevious=\n')
})

test('encoder failure keeps previous avatar references and asset', async (t) => {
  const root = await makeFixture(t)
  const before = await readFile(path.join(root, 'index.html'), 'utf8')
  await assert.rejects(syncAvatar({ root, fetchImpl: mockFetch(), encode: async () => { throw new Error('encoder failed') } }), /encoder failed/)
  assert.equal(await readFile(path.join(root, 'index.html'), 'utf8'), before)
  assert.equal((await readFile(path.join(root, '.github/avatar-source.sha256'), 'utf8')), 'current=' + priorHash + '\nprevious=\n')
})

test('corrupt existing versioned asset stops safely without deleting files', async (t) => {
  const root = await makeFixture(t, sourceHash)
  const currentAsset = path.join(root, 'public/images/github-avatar-' + sourceHash + '.webp')
  const portfolioBefore = await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8')
  await writeFile(currentAsset, 'corrupt')
  const namesBefore = await autoAvatarNames(root)
  await assert.rejects(syncAvatar({ root, fetchImpl: mockFetch() }), /existing versioned avatar asset was invalid/)
  assert.deepEqual(await autoAvatarNames(root), namesBefore)
  assert.equal(await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8'), portfolioBefore)
})

test('first sync initializes current, repeat is a no-op, and fallback stays available', async (t) => {
  const root = await makeFixture(t, null)
  const result = await syncAvatar({
    root,
    fetchImpl: mockFetch(),
    encode: async (_inputPath, outputPath) => writeFile(outputPath, webpBytes),
  })
  assert.equal(result.changed, true)
  assert.equal(result.previous, '')
  assert.equal((await readFile(path.join(root, '.github/avatar-source.sha256'), 'utf8')), 'current=' + sourceHash + '\nprevious=\n')
  assert.equal((await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8')).includes("avatarFallback: ''"), true)
  const repeat = await syncAvatar({ root, fetchImpl: mockFetch(), encode: async () => assert.fail('unchanged avatar must not be encoded') })
  assert.equal(repeat.changed, false)
  assert.equal((await autoAvatarNames(root)).length, 1)
})

test('second and later changes retain exactly current and previous synced versions', async (t) => {
  const root = await makeFixture(t, priorHash, olderHash)
  await writeFile(path.join(root, 'public/images/portfolio-artwork.webp'), webpBytes)
  const sync = async (bytes) => syncAvatar({
    root,
    fetchImpl: mockFetch({ bytes }),
    encode: async (_inputPath, outputPath) => writeFile(outputPath, webpBytes),
  })

  const second = await sync(photoB)
  const hashB = createHash('sha256').update(photoB).digest('hex')
  assert.equal(second.previous, 'public/images/github-avatar-' + priorHash + '.webp')
  assert.deepEqual(await autoAvatarNames(root), ['github-avatar-' + priorHash + '.webp', 'github-avatar-' + hashB + '.webp'].sort())
  assert.equal((await readFile(path.join(root, 'src/content/portfolio.ts'), 'utf8')).includes("avatarFallback: '/images/github-avatar-" + priorHash + ".webp'"), true)

  const third = await sync(photoC)
  const hashC = createHash('sha256').update(photoC).digest('hex')
  assert.equal(third.previous, 'public/images/github-avatar-' + hashB + '.webp')
  assert.deepEqual(await autoAvatarNames(root), ['github-avatar-' + hashB + '.webp', 'github-avatar-' + hashC + '.webp'].sort())

  const fourth = await sync(photoD)
  const hashD = createHash('sha256').update(photoD).digest('hex')
  assert.equal(fourth.previous, 'public/images/github-avatar-' + hashC + '.webp')
  assert.deepEqual(await autoAvatarNames(root), ['github-avatar-' + hashC + '.webp', 'github-avatar-' + hashD + '.webp'].sort())
  assert.equal((await readFile(path.join(root, 'public/images/portfolio-artwork.webp'))).equals(webpBytes), true)
})

test('legacy hash state migrates without relying on file timestamps', async (t) => {
  const root = await makeFixture(t, priorHash, null, true)
  const result = await syncAvatar({
    root,
    fetchImpl: mockFetch({ bytes: photoB }),
    encode: async (_inputPath, outputPath) => writeFile(outputPath, webpBytes),
  })
  const hashB = createHash('sha256').update(photoB).digest('hex')
  assert.equal(result.previous, 'public/images/github-avatar-' + priorHash + '.webp')
  assert.equal((await readFile(path.join(root, '.github/avatar-source.sha256'), 'utf8')), 'current=' + hashB + '\nprevious=' + priorHash + '\n')
})

test('fallback and static links remain aligned with the local-first app chain', async () => {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const [app, portfolio, html, syncWorkflow, pagesWorkflow] = await Promise.all([
    readFile(path.join(projectRoot, 'src/App.tsx'), 'utf8'),
    readFile(path.join(projectRoot, 'src/content/portfolio.ts'), 'utf8'),
    readFile(path.join(projectRoot, 'index.html'), 'utf8'),
    readFile(path.join(projectRoot, '.github/workflows/sync-avatar.yml'), 'utf8'),
    readFile(path.join(projectRoot, '.github/workflows/pages.yml'), 'utf8'),
  ])
  assert.match(app, /avatarSources = \[avatarUrl, profile\.avatarFallback, profile\.githubAvatar\]\.filter/)
  assert.match(app, /sourceIndex >= avatarSources\.length/)
  const current = portfolio.match(/avatar: '(\/images\/github-avatar-[a-f0-9]{64}\.webp)'/)
  assert.ok(current)
  assert.equal((html.match(new RegExp(current[1].replaceAll('/', '\\/'), 'g')) || []).length, 2)
  assert.doesNotMatch(html, /rel=["']preload["'][^>]*github-avatar/)
  assert.match(syncWorkflow, /event_type=avatar-updated/)
  assert.match(syncWorkflow, /client_payload\[commit\]=\$PUSHED_COMMIT/)
  assert.match(pagesWorkflow, /types: \[avatar-updated\]/)
  assert.match(pagesWorkflow, /client_payload\.commit \|\| github\.sha/)
})

test('workflow allowlist includes managed add/delete paths and lets push conflicts fail without force', async () => {
  const workflow = await readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.github/workflows/sync-avatar.yml'), 'utf8')
  assert.match(workflow, /git add -- "\$\{allowed_paths\[@\]\}"/)
  assert.match(workflow, /git diff --cached --name-only --no-renames/)
  assert.match(workflow, /validate_avatar_path "\$retired_path"/)
  assert.match(workflow, /git push origin HEAD:refs\/heads\/main/)
  assert.doesNotMatch(workflow, /git add[^\n]*-A/)
  assert.doesNotMatch(workflow, /git push[^\n]*--force/)
})

test('a rejected push stops before Pages dispatch without invoking real Git', () => {
  const simulated = spawnSync('bash', [
    '-e',
    '-o',
    'pipefail',
    '-c',
    'git() { return 1; }; git push origin HEAD:refs/heads/main; echo dispatch',
  ], { encoding: 'utf8' })
  assert.notEqual(simulated.status, 0)
  assert.doesNotMatch(simulated.stdout, /dispatch/)
})
