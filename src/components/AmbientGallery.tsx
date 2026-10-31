import { useEffect, useState, type CSSProperties } from 'react'
import { ambientArtworks, heroArtworks } from '../content/artworks'
import type { Artwork } from '../content/artworks'

type Side = 'left' | 'right'

type CollageItem = {
  artwork: Artwork
  side: Side
  x: number
  y: number
  width: number
  rotation: number
  depth: 'front' | 'middle' | 'back'
}

const itemsPerSide = 7
type CollageSlot = Pick<CollageItem, 'x' | 'y' | 'width' | 'rotation' | 'depth'>

const layouts: Record<Side, readonly (readonly CollageSlot[])[]> = {
  left: [
    [
      { x: 3, y: 1, width: 54, rotation: -5, depth: 'back' },
      { x: 34, y: 11, width: 64, rotation: 3, depth: 'front' },
      { x: 0, y: 26, width: 43, rotation: -2, depth: 'middle' },
      { x: 14, y: 34, width: 90, rotation: 2, depth: 'front' },
      { x: 42, y: 51, width: 53, rotation: -4, depth: 'back' },
      { x: 2, y: 64, width: 74, rotation: 4, depth: 'middle' },
      { x: 28, y: 82, width: 62, rotation: -2, depth: 'front' },
    ],
    [
      { x: 25, y: 0, width: 69, rotation: 4, depth: 'middle' },
      { x: 0, y: 15, width: 85, rotation: -3, depth: 'front' },
      { x: 47, y: 29, width: 49, rotation: 5, depth: 'back' },
      { x: 7, y: 39, width: 64, rotation: -4, depth: 'middle' },
      { x: 32, y: 54, width: 75, rotation: 2, depth: 'front' },
      { x: 0, y: 71, width: 55, rotation: -5, depth: 'back' },
      { x: 27, y: 86, width: 70, rotation: 3, depth: 'front' },
    ],
    [
      { x: 0, y: 4, width: 78, rotation: -2, depth: 'front' },
      { x: 44, y: 19, width: 51, rotation: 5, depth: 'back' },
      { x: 17, y: 31, width: 69, rotation: -4, depth: 'middle' },
      { x: 1, y: 46, width: 46, rotation: 3, depth: 'back' },
      { x: 27, y: 55, width: 92, rotation: -1, depth: 'front' },
      { x: 0, y: 76, width: 63, rotation: 4, depth: 'middle' },
      { x: 38, y: 88, width: 55, rotation: -5, depth: 'front' },
    ],
  ],
  right: [
    [
      { x: 36, y: 0, width: 58, rotation: 5, depth: 'back' },
      { x: 1, y: 13, width: 83, rotation: -3, depth: 'front' },
      { x: 43, y: 29, width: 50, rotation: 4, depth: 'middle' },
      { x: 10, y: 39, width: 67, rotation: -5, depth: 'back' },
      { x: 0, y: 53, width: 96, rotation: 2, depth: 'front' },
      { x: 39, y: 73, width: 58, rotation: -4, depth: 'middle' },
      { x: 7, y: 87, width: 71, rotation: 3, depth: 'front' },
    ],
    [
      { x: 0, y: 2, width: 71, rotation: -4, depth: 'middle' },
      { x: 36, y: 16, width: 62, rotation: 4, depth: 'front' },
      { x: 4, y: 29, width: 94, rotation: -2, depth: 'front' },
      { x: 48, y: 47, width: 48, rotation: 5, depth: 'back' },
      { x: 13, y: 56, width: 66, rotation: -4, depth: 'middle' },
      { x: 0, y: 75, width: 80, rotation: 2, depth: 'front' },
      { x: 43, y: 91, width: 53, rotation: -5, depth: 'back' },
    ],
    [
      { x: 40, y: 0, width: 54, rotation: 4, depth: 'back' },
      { x: 0, y: 10, width: 93, rotation: -2, depth: 'front' },
      { x: 30, y: 30, width: 63, rotation: 5, depth: 'middle' },
      { x: 0, y: 43, width: 52, rotation: -4, depth: 'back' },
      { x: 35, y: 52, width: 64, rotation: 3, depth: 'front' },
      { x: 2, y: 68, width: 88, rotation: -3, depth: 'middle' },
      { x: 32, y: 87, width: 62, rotation: 5, depth: 'front' },
    ],
  ],
}

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

function createComposition(): CollageItem[] {
  const heroPaths = new Set(heroArtworks.map((artwork) => artwork.src))
  const heroSources = new Set(heroArtworks.map((artwork) => artwork.source))
  const heroIds = new Set(heroArtworks.map((artwork) => artwork.id))
  const seen = new Set<string>()
  const uniqueArtwork = ambientArtworks.filter((artwork) => {
    if (heroIds.has(artwork.id) || heroPaths.has(artwork.src) || heroSources.has(artwork.source)) return false
    if (seen.has(artwork.id) || seen.has(artwork.src) || seen.has(artwork.source)) return false
    seen.add(artwork.id)
    seen.add(artwork.src)
    seen.add(artwork.source)
    return true
  })
  const selected = shuffle(uniqueArtwork).slice(0, itemsPerSide * 2)
  const sideLayouts: Record<Side, readonly CollageSlot[]> = {
    left: layouts.left[Math.floor(Math.random() * layouts.left.length)] ?? layouts.left[0] ?? [],
    right: layouts.right[Math.floor(Math.random() * layouts.right.length)] ?? layouts.right[0] ?? [],
  }

  return selected.flatMap((artwork, index) => {
    const side: Side = index < itemsPerSide ? 'left' : 'right'
    const sideIndex = index % itemsPerSide
    const slot = sideLayouts[side][sideIndex]
    if (!slot) return []
    const jitter = (amount: number) => (Math.random() * 2 - 1) * amount
    const x = Math.max(0, Math.min(45, slot.x + jitter(3)))

    return [{
      artwork,
      side,
      x,
      y: Math.max(0, Math.min(94, slot.y + jitter(2.5))),
      width: Math.max(42, Math.min(100 - x, slot.width + jitter(7))),
      rotation: slot.rotation + jitter(1.5),
      depth: slot.depth,
    }]
  })
}

const composition = createComposition()

function useAmbientGalleryEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const wideScreen = window.matchMedia('(min-width: 1680px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(wideScreen.matches && !reducedMotion.matches)

    update()
    wideScreen.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      wideScreen.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])

  return enabled
}

export function AmbientGallery() {
  const enabled = useAmbientGalleryEnabled()
  if (!enabled) return null

  return (
    <div className="ambient-gallery" aria-hidden="true">
        {(['left', 'right'] as const).map((side) => (
          <div className={`ambient-gallery__side ambient-gallery__side--${side}`} key={side}>
            {composition.filter((item) => item.side === side).map((item) => (
          <img
            className={`ambient-gallery__image ambient-gallery__image--${item.depth}`}
            src={item.artwork.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={item.artwork.width}
            height={item.artwork.height}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.width}%`,
              transform: `rotate(${item.rotation}deg)`,
            } as CSSProperties}
          />
            ))}
          </div>
      ))}
    </div>
  )
}
