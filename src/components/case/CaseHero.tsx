import type { CaseHeroProps } from './types'

export function CaseHero({
  kicker,
  title,
  dek,
  meta,
  metrics,
  visual,
  glowClassName,
  visualClassName,
  heroClassName,
}: CaseHeroProps) {
  return (
    <section className={['gf-hero', heroClassName].filter(Boolean).join(' ')}>
      <div className={['gf-hero-glow', glowClassName].filter(Boolean).join(' ')} aria-hidden="true" />
      <div className="gf-hero-grid" aria-hidden="true" />
      <div className={['gf-hero-visual', visualClassName].filter(Boolean).join(' ')} aria-hidden="true">
        {visual}
      </div>

      <div className="gf-hero-body">
        <div className="gf-reveal">
          <p className="gf-kicker">{kicker}</p>
          <h1 className="gf-hero-title">{title}</h1>
          <p className="gf-hero-dek">{dek}</p>
          <div className="gf-hero-meta">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="gf-metrics">
        {metrics.map((item) => (
          <div className="gf-metric" key={item.label}>
            <span className="gf-metric-label">{item.label}</span>
            <span className={`gf-metric-value${item.accent ? ' is-accent' : ''}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
