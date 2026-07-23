import { useEffect, useRef } from 'react'
import { educations, experiences } from '../data/experiences'
import { Footer } from '../components/Footer'
import '../styles/nav.css'
import '../styles/footer.css'
import '../styles/myself.css'

export function Myself() {
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const lines = document.querySelectorAll('.myself-intro-line')
    lines.forEach((line, i) => {
      ;(line as HTMLElement).style.animationDelay = `${i * 0.08}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const items = listRef.current?.querySelectorAll('.myself-experience-item')
    items?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="page">
      <div className="myself-page" ref={listRef}>
        <header className="myself-header">
          <div className="myself-intro-line">
            <p className="text-h1-light myself-intro-text">Hi, I'm Tommy</p>
          </div>
          <div className="myself-intro-line">
            <p className="text-h1-light myself-intro-text">产品体验设计师，深耕金融、效率类与云服务等复杂产品。</p>
          </div>
          <div className="myself-intro-line">
            <p className="text-h1-light myself-intro-text">用设计方法拆解复杂产品，把体验设计做成可度量的业务结果。</p>
          </div>
          <div className="myself-intro-line myself-intro-meta-wrap">
            <p className="myself-intro-meta myself-intro-text">
              <a href="mailto:fengzhao@vip.qq.com">fengzhao@vip.qq.com</a>
              <span className="myself-intro-dot" aria-hidden="true">
                ·
              </span>
              <a href="tel:18066880020">18066880020</a>
            </p>
          </div>
        </header>

        <section className="myself-section">
          <h2 className="myself-section-title">Experience</h2>
          <div className="myself-experience-list">
            {experiences.map((item) => (
              <div key={`${item.start}-${item.company}`} className="myself-experience-item">
                <div className="experience-item">
                  <div className="experience-meta">
                    <div className="experience-time">
                      <span className="experience-year">{item.start}</span>
                      <span className="experience-dash" aria-hidden="true" />
                      <span className="experience-year">{item.end}</span>
                    </div>
                    <div className="experience-role">
                      <span>{item.position}</span>
                      <span className="experience-sep">·</span>
                      <span>{item.company}</span>
                    </div>
                  </div>
                  <p className="experience-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="myself-section myself-section--education">
          <h2 className="myself-section-title">Education</h2>
          <div className="myself-experience-list">
            {educations.map((item) => (
              <div
                key={`${item.start}-${item.degree}-${item.school}`}
                className="myself-experience-item"
              >
                <div className="experience-item experience-item--compact">
                  <div className="experience-meta">
                    <div className="experience-time">
                      <span className="experience-year">{item.start}</span>
                      <span className="experience-dash" aria-hidden="true" />
                      <span className="experience-year">{item.end}</span>
                    </div>
                    <div className="experience-role">
                      <span>
                        {item.school} · {item.major}
                      </span>
                      <span className="experience-sep">·</span>
                      <span>{item.degree}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
