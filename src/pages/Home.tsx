import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HandwriteSignature } from '../components/HandwriteSignature'
import '../styles/nav.css'
import '../styles/home.css'

const LINES = [
  { text: '我是一名有超过10年工作经验的体验设计师。', lead: true },
  { text: '我专注复杂数字产品的体验与结构，', lead: false },
  { text: '让系统逻辑以用户可感知的方式呈现。', lead: false },
] as const

export function Home() {
  const [ready, setReady] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setReady(true)
      setFinished(true)
      return
    }

    const frame = requestAnimationFrame(() => setReady(true))
    const doneAt = window.setTimeout(() => setFinished(true), 1600)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(doneAt)
    }
  }, [])

  return (
    <main className="page page-home">
      <section className="home-hero">
        <div className={`home-copy${ready ? ' is-ready' : ''}${finished ? ' is-finished' : ''}`}>
          <span className="home-mark" aria-hidden="true" />
          {LINES.map((line, i) => (
            <p
              key={line.text}
              className={`home-line${line.lead ? ' home-line--lead' : ''}`}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="home-line-inner">{line.text}</span>
            </p>
          ))}
          <div className="home-cta-row" style={{ '--i': LINES.length } as CSSProperties}>
            <Link className="home-cta" to="/work">
              查看作品
              <picture className="home-cta-arrow-picture">
                <source media="(max-width: 600px)" srcSet="/Homepage_arrow/mobile.svg" />
                <img src="/Homepage_arrow/desktop.svg" alt="" className="home-cta-arrow" />
              </picture>
            </Link>
          </div>
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
