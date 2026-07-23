import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { Footer } from '../Footer'
import '../../styles/case-base.css'
import '../../styles/footer.css'
import '../../styles/nav.css'

export function CaseShell({
  pageClassName,
  caseClassName,
  accent,
  theme,
  children,
}: {
  pageClassName?: string
  caseClassName?: string
  /** Matches Work card hover `--card-accent` / works.accent */
  accent?: string
  theme?: 'light' | 'dark'
  children: ReactNode
}) {
  const isLight = theme === 'light'
  const pageCls = ['page', 'gf-page', pageClassName].filter(Boolean).join(' ')
  const caseCls = ['gf-case', isLight ? 'gf-case--light' : '', caseClassName]
    .filter(Boolean)
    .join(' ')
  const caseStyle = accent
    ? ({
        ['--gf-acc' as string]: isLight
          ? `color-mix(in srgb, ${accent} 42%, #0369a1 58%)`
          : accent,
        ['--gf-acc-soft' as string]: isLight
          ? `color-mix(in srgb, ${accent} 10%, transparent)`
          : `color-mix(in srgb, ${accent} 14%, transparent)`,
      } satisfies CSSProperties)
    : undefined

  useEffect(() => {
    if (!isLight) return
    const root = document.documentElement
    root.classList.add('theme-light')
    return () => {
      root.classList.remove('theme-light')
    }
  }, [isLight])

  return (
    <main className={pageCls}>
      <div className={caseCls} style={caseStyle}>
        {children}
        <Footer />
      </div>
    </main>
  )
}
