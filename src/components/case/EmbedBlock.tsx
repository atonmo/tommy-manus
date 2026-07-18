export function EmbedBlock({
  src,
  title,
  caption,
  tall,
  flush,
  frame,
}: {
  src: string
  title: string
  caption?: string
  tall?: boolean
  flush?: boolean
  frame?: boolean
}) {
  const iframeClass = ['wt-embed', tall ? 'tall' : '', frame ? 'is-frame-embed' : '']
    .filter(Boolean)
    .join(' ')

  const iframe = (
    <iframe
      className={iframeClass}
      src={src}
      title={title}
      loading={frame ? 'eager' : 'lazy'}
      scrolling={flush ? 'no' : undefined}
      style={flush ? { overflow: 'hidden' } : undefined}
    />
  )

  return (
    <div
      className={`wt-embed-wrap${flush ? ' is-flush' : ''}${frame ? ' is-frame' : ''}`}
    >
      {frame ? <div className="wt-embed-frame">{iframe}</div> : iframe}
      {caption ? <p className="wt-embed-caption">{caption}</p> : null}
    </div>
  )
}
