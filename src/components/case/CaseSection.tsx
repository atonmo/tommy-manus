import type { ReactNode } from 'react'

export function CaseSection({
  variant = 'head',
  label,
  title,
  lead,
  children,
}: {
  variant?: 'head' | 'step'
  label: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="gf-section">
      {variant === 'step' ? (
        <div className="gf-step-label">
          <span className="gf-step-num">{label}</span>
          <h2 className="gf-step-name">{title}</h2>
        </div>
      ) : (
        <header className="gf-section-head">
          <p className="gf-mono-label">{label}</p>
          <h2 className="gf-section-title">{title}</h2>
          {lead ? <p className="gf-section-lead">{lead}</p> : null}
        </header>
      )}
      {children}
    </section>
  )
}
