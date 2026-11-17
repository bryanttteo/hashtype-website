import CircuitArt from './CircuitArt.jsx'
import SectorArt from './SectorArt.jsx'
import { imageAlt, sectorForImage } from '../content/images.js'

// Every photo dropped into src/assets/photos/ is found at build time.
const files = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const byName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().toLowerCase(), url]),
)

// Matches "industry-fnb.jpg" whether it was saved as .jpg, .jpeg, .png or .webp.
function findPhoto(name) {
  if (!name) return null
  const base = name.toLowerCase().replace(/\.(jpe?g|png|webp)$/, '')
  for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
    if (byName[`${base}.${ext}`]) return byName[`${base}.${ext}`]
  }
  return null
}

export default function Photo({ name, className = '', eager = false }) {
  const src = findPhoto(name)
  return (
    <div className={`photo ${className}`}>
      {src ? (
        <img
          src={src}
          alt={imageAlt[name] ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : sectorForImage[name] ? (
        <SectorArt sector={sectorForImage[name]} />
      ) : (
        <CircuitArt seed={name ?? 'hashtype'} />
      )}
    </div>
  )
}
