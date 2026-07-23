import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import type { CaseReflectionPoint } from './types'
import { MediaBlock } from './MediaBlock'

const components: Components = {
  p: ({ node, children }) => {
    const kids = node?.children ?? []
    const onlyImg =
      kids.length === 1 &&
      kids[0]?.type === 'element' &&
      (kids[0] as { tagName?: string }).tagName === 'img'
    if (onlyImg) return <>{children}</>
    return <p className="gf-prose">{children}</p>
  },
  ol: ({ children }) => <ol className="gf-list">{children}</ol>,
  ul: ({ children }) => <ul className="gf-list">{children}</ul>,
  blockquote: ({ children }) => <blockquote className="wt-callout">{children}</blockquote>,
  strong: ({ children }) => <strong>{children}</strong>,
  table: ({ children }) => (
    <div className="gf-table-wrap">
      <table className="gf-table">{children}</table>
    </div>
  ),
  img: ({ src, alt, title }) => {
    if (!src) return null
    return <MediaBlock src={src} alt={alt || ''} caption={title || undefined} />
  },
}

export function CaseReflection({
  label = 'Design Reflection',
  title,
  body,
  footer,
  points,
}: {
  label?: string
  title: React.ReactNode
  body: string
  footer?: string
  points: CaseReflectionPoint[]
}) {
  return (
    <section className="gf-reflection">
      <p className="gf-mono-label">{label}</p>
      <h2 className="gf-reflection-title">{title}</h2>
      {body ? (
        <div className="gf-reflection-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {body}
          </ReactMarkdown>
        </div>
      ) : null}
      {points.length > 0 ? (
        <div className="gf-points">
          {points.map((point) => (
            <div className="gf-point" key={point.idx}>
              <span className="gf-point-idx">{point.idx}</span>
              <div>
                <strong>{point.title}</strong>
                <p>{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {footer ? (
        <div className="gf-reflection-content gf-reflection-footer">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {footer}
          </ReactMarkdown>
        </div>
      ) : null}
    </section>
  )
}
