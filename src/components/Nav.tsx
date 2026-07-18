import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles/nav.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/myself', label: 'About' },
  { to: '/chat', label: 'Chat' },
]

type Indicator = {
  left: number
  width: number
  ready: boolean
}

export function Nav() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, ready: false })
  const centerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const lastScrollY = useRef(0)
  const isArticle = location.pathname.startsWith('/article/')

  const activeIndex = links.findIndex((l) => {
    if (l.to === '/') return location.pathname === '/'
    if (l.to === '/work') return location.pathname.startsWith('/work') || isArticle
    return location.pathname.startsWith(l.to)
  })

  const focusIndex = hoverIndex ?? (activeIndex >= 0 ? activeIndex : 0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const update = () => setIsTablet(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setHoverIndex(null)
    setHidden(false)
    lastScrollY.current = window.scrollY
  }, [location.pathname])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (y < 48) {
        setHidden(false)
      } else if (delta > 6) {
        setHidden(true)
        setMenuOpen(false)
      } else if (delta < -6) {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    if (isTablet) return

    const move = () => {
      const center = centerRef.current
      const link = linkRefs.current[focusIndex]
      if (!center || !link) return
      const c = center.getBoundingClientRect()
      const l = link.getBoundingClientRect()
      setIndicator({
        left: l.left - c.left,
        width: l.width,
        ready: true,
      })
    }

    move()
    window.addEventListener('resize', move)
    return () => window.removeEventListener('resize', move)
  }, [focusIndex, isTablet, location.pathname])

  const current =
    links.find((l) => {
      if (l.to === '/') return location.pathname === '/'
      if (l.to === '/work') return location.pathname.startsWith('/work') || isArticle
      return location.pathname.startsWith(l.to)
    })?.label ?? 'Home'

  return (
    <nav
      className={`nav ${isTablet ? 'nav-mobile' : ''} ${menuOpen ? 'nav-open' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}
    >
      <div className="nav-inner">
        {!isTablet ? (
          <div
            className="nav-center"
            ref={centerRef}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span
              className={`nav-indicator ${indicator.ready ? 'is-ready' : ''}`}
              style={{
                transform: `translate3d(${indicator.left}px, 0, 0)`,
                width: `${indicator.width}px`,
              }}
              aria-hidden="true"
            />
            {links.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
                className={({ isActive }) => {
                  const active = isActive || (link.to === '/work' && isArticle)
                  return `nav-link ${active ? 'nav-link-active' : ''}`
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => setHoverIndex(null)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ) : (
          <button type="button" className="nav-mobile-trigger" onClick={() => setMenuOpen((v) => !v)}>
            <span>{current}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
          </button>
        )}
      </div>

      {isTablet && menuOpen ? (
        <div className="nav-mobile-menu">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => {
                const active = isActive || (link.to === '/work' && isArticle)
                return `nav-mobile-link ${active ? 'nav-link-active' : ''}`
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </nav>
  )
}
