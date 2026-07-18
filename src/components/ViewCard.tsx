import { Link } from 'react-router-dom'
import type { WorkItem } from '../data/works'

export function ViewCard({ item }: { item: WorkItem }) {
  const caseNo = String(item.id).padStart(2, '0')

  return (
    <Link
      to={`/article/${item.slug}`}
      className="case-card"
      style={{ ['--card-accent' as string]: item.accent }}
    >
      <div className="case-card-top">
        <span className="case-index">CASE {caseNo}</span>
        <span className="case-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <h3 className="case-title">{item.title}</h3>
      <p className="case-pitch">{item.description}</p>

      <div className="case-foot">
        <span className="case-year">
          {item.start} — {item.end}
        </span>
        <span className="case-role">{item.role}</span>
      </div>
    </Link>
  )
}
