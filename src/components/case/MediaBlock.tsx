import type { CaseMedia } from './types'

export function MediaBlock({ src, alt, caption, className }: CaseMedia) {
  return (
    <figure className={['gf-media', className].filter(Boolean).join(' ')}>
      <img src={src} alt={alt} loading="eager" decoding="async" />
      {caption ? <figcaption className="gf-caption">{caption}</figcaption> : null}
    </figure>
  )
}
