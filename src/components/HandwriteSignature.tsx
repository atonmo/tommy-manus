import { useEffect, useState } from 'react'

type Props = {
  className?: string
  /** Start write-on only after the home typewriter finishes. */
  active?: boolean
}

/**
 * Legible handwriting signature with a smooth left-to-right reveal.
 * CSS clip-path keeps the motion GPU-friendly (no canvas jank).
 */
export function HandwriteSignature({ className = '', active = false }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active) {
      setReady(false)
      return
    }

    let cancelled = false

    const start = async () => {
      try {
        await document.fonts.load('600 56px "Caveat"')
      } catch {
        /* use fallback stack */
      }
      if (!cancelled) setReady(true)
    }

    void start()

    return () => {
      cancelled = true
    }
  }, [active])

  const drawing = active && ready

  return (
    <div
      className={`home-signature ${drawing ? 'is-drawing' : ''} ${className}`.trim()}
      aria-hidden={!active}
    >
      <span className="home-signature-text">{"I'm Tommy"}</span>
    </div>
  )
}
