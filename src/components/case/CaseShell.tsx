import type { CSSProperties, ReactNode } from 'react'
import { Footer } from '../Footer'
import '../../styles/case-base.css'
import '../../styles/footer.css'
import '../../styles/nav.css'

export function CaseShell({
  pageClassName,
  caseClassName,
  accent,
  children,
}: {
  pageClassName?: string
  caseClassName?: string
  /** Matches Work card hover `--card-accent` / works.accent */
  accent?: string
  children: ReactNode
}) {
  const pageCls = ['page', 'gf-page', pageClassName].filter(Boolean).join(' ')
  const caseCls = ['gf-case', caseClassName].filter(Boolean).join(' ')
  const caseStyle = accent
    ? ({
        ['--gf-acc' as string]: accent,
        ['--gf-acc-soft' as string]: `color-mix(in srgb, ${accent} 14%, transparent)`,
      } satisfies CSSProperties)
    : undefined

  return (
    <main className={pageCls}>
      <div className={caseCls} style={caseStyle}>
        {children}
        <Footer />
      </div>
    </main>
  )
}
