import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ManusBackdrop } from './components/ManusBackdrop'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { Myself } from './pages/Myself'
import { Chat } from './pages/Chat'
import { Article } from './pages/Article'
import { useEffect } from 'react'

function Shell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  useEffect(() => {
    document.documentElement.classList.toggle('page-home-active', isHome)
    return () => document.documentElement.classList.remove('page-home-active')
  }, [isHome])

  return (
    <div className="app-shell">
      <div className="app-atmosphere" aria-hidden="true" />
      {isHome ? <ManusBackdrop /> : null}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/myself" element={<Myself />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
