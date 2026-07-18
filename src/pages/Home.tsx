import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HandwriteSignature } from '../components/HandwriteSignature'
import '../styles/nav.css'
import '../styles/home.css'

const LINES = [
  '我是一名热爱产品与体验的设计师，',
  '正在持续打磨自己的作品与表达。',
  '热衷于探索新鲜领域，并尝试用设计创造新的可能性。',
]

const CTA_TEXT = '浏览我的工作'
const CHAR_DELAY = 80
const LINE_PAUSE = 300

type Phase = 'lines' | 'cta' | 'arrow' | 'done'

export function Home() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [ctaIndex, setCtaIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('lines')
  const [showArrow, setShowArrow] = useState(false)

  useEffect(() => {
    if (phase === 'done') return

    if (phase === 'lines') {
      if (lineIndex >= LINES.length) {
        const t = window.setTimeout(() => setPhase('cta'), 0)
        return () => window.clearTimeout(t)
      }

      const current = LINES[lineIndex]
      if (charIndex < current.length) {
        const t = window.setTimeout(() => setCharIndex((c) => c + 1), CHAR_DELAY)
        return () => window.clearTimeout(t)
      }

      const isLastLine = lineIndex >= LINES.length - 1
      const t = window.setTimeout(
        () => {
          setLineIndex((i) => i + 1)
          setCharIndex(0)
        },
        isLastLine ? 0 : LINE_PAUSE,
      )
      return () => window.clearTimeout(t)
    }

    if (phase === 'cta') {
      if (ctaIndex < CTA_TEXT.length) {
        const t = window.setTimeout(() => setCtaIndex((c) => c + 1), CHAR_DELAY)
        return () => window.clearTimeout(t)
      }
      const t = window.setTimeout(() => {
        setShowArrow(true)
        setPhase('arrow')
      }, CHAR_DELAY)
      return () => window.clearTimeout(t)
    }

    if (phase === 'arrow') {
      const t = window.setTimeout(() => setPhase('done'), 50)
      return () => window.clearTimeout(t)
    }
  }, [phase, lineIndex, charIndex, ctaIndex])

  const finished = phase === 'done'
  const typingCta = phase === 'cta' || phase === 'arrow' || phase === 'done'

  return (
    <main className="page page-home">
      <section className="home-hero">
        <div className={`home-copy ${finished ? 'is-finished' : ''}`} id="home-typewriter">
          <span className="home-typewriter">
            {LINES.slice(0, lineIndex).map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            {lineIndex < LINES.length ? LINES[lineIndex].slice(0, charIndex) : null}
            {typingCta ? (
              <>
                <br />
                <Link className="home-cta" to="/work">
                  {CTA_TEXT.slice(0, ctaIndex)}
                  {showArrow ? (
                    <picture className="home-cta-arrow-picture">
                      <source media="(max-width: 600px)" srcSet="/Homepage_arrow/mobile.svg" />
                      <img src="/Homepage_arrow/desktop.svg" alt="" className="home-cta-arrow" />
                    </picture>
                  ) : null}
                </Link>
              </>
            ) : null}
            {!finished ? <span className="home-caret" aria-hidden="true" /> : null}
          </span>
        </div>
      </section>

      <div className="home-bottom">
        <div className={`home-signature-wrap${finished ? ' is-active' : ''}`}>
          <HandwriteSignature active={finished} />
        </div>
      </div>
    </main>
  )
}
