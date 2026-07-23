import { useEffect, useRef } from 'react'
import { works } from '../data/works'
import { ViewCard } from '../components/ViewCard'
import { Footer } from '../components/Footer'
import '../styles/nav.css'
import '../styles/footer.css'
import '../styles/work.css'

export function Work() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="page">
      <div className="work-page">
        <header className="work-header">
          <p className="work-kicker">Selected Works</p>
          <h1 className="work-heading">设计是规划未来。</h1>
          <div className="work-meta text-muted">
            <span>{works.length} cases</span>
            <span>Update 26.07.22</span>
          </div>
        </header>

        <div className="work-grid">
          {works.map((item, index) => (
            <div
              key={item.id}
              className="work-grid-item"
              style={{ transitionDelay: `${Math.min(index, 8) * 45}ms` }}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
            >
              <ViewCard item={item} />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </main>
  )
}
