import { useEffect, useRef } from 'react'
import '../styles/manus-backdrop.css'

type ShapeKind = 'circle' | 'rect' | 'triangle' | 'cross' | 'diamond' | 'ring'

type ShapeConfig = {
  kind: ShapeKind
  color: string
  ox: number
  oy: number
  size: number
  rotation: number
  spin: number
  ampX: number
  ampY: number
  freqX: number
  freqY: number
  phase: number
}

type Sprite = ShapeConfig & {
  canvas: HTMLCanvasElement
  half: number
}

function createConfigs(w: number, h: number): ShapeConfig[] {
  const cx = w / 2
  const cy = h / 2
  const m = Math.min(w, h) * 1.5
  return [
    { kind: 'rect', color: '#E8C47A', ox: cx - w * 0.26, oy: cy - h * 0.06, size: m * 0.46, rotation: 0.35, spin: 0.35, ampX: w * 0.14, ampY: h * 0.12, freqX: 0.42, freqY: 0.34, phase: 0.2 },
    { kind: 'circle', color: '#7EC8E3', ox: cx + w * 0.04, oy: cy - h * 0.2, size: m * 0.4, rotation: 0, spin: 0.22, ampX: w * 0.12, ampY: h * 0.15, freqX: 0.36, freqY: 0.48, phase: 1.1 },
    { kind: 'cross', color: '#E89B9B', ox: cx + w * 0.02, oy: cy + h * 0.04, size: m * 0.52, rotation: 0.15, spin: -0.4, ampX: w * 0.15, ampY: h * 0.13, freqX: 0.3, freqY: 0.4, phase: 2.0 },
    { kind: 'triangle', color: '#A8D5A2', ox: cx + w * 0.28, oy: cy + h * 0.02, size: m * 0.38, rotation: -0.4, spin: 0.48, ampX: w * 0.16, ampY: h * 0.12, freqX: 0.5, freqY: 0.28, phase: 2.8 },
    { kind: 'diamond', color: '#F5C6AA', ox: cx - w * 0.1, oy: cy + h * 0.26, size: m * 0.36, rotation: 0.5, spin: -0.3, ampX: w * 0.13, ampY: h * 0.16, freqX: 0.32, freqY: 0.44, phase: 3.6 },
    { kind: 'ring', color: '#9BB7D4', ox: cx + w * 0.2, oy: cy + h * 0.24, size: m * 0.34, rotation: 0, spin: 0.26, ampX: w * 0.12, ampY: h * 0.14, freqX: 0.4, freqY: 0.35, phase: 4.4 },
    { kind: 'circle', color: '#D4C4A8', ox: cx - w * 0.18, oy: cy + h * 0.12, size: m * 0.28, rotation: 0, spin: -0.2, ampX: w * 0.1, ampY: h * 0.1, freqX: 0.55, freqY: 0.26, phase: 5.2 },
  ]
}

function drawShape(ctx: CanvasRenderingContext2D, kind: ShapeKind, size: number) {
  const s = size
  ctx.beginPath()
  switch (kind) {
    case 'circle':
      ctx.arc(0, 0, s * 0.36, 0, Math.PI * 2)
      break
    case 'ring':
      ctx.arc(0, 0, s * 0.36, 0, Math.PI * 2)
      ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2, true)
      break
    case 'rect':
      ctx.roundRect(-s * 0.28, -s * 0.17, s * 0.56, s * 0.34, s * 0.035)
      break
    case 'triangle':
      ctx.moveTo(0, -s * 0.34)
      ctx.lineTo(s * 0.34, s * 0.28)
      ctx.lineTo(-s * 0.34, s * 0.28)
      ctx.closePath()
      break
    case 'diamond':
      ctx.moveTo(0, -s * 0.36)
      ctx.lineTo(s * 0.28, 0)
      ctx.lineTo(0, s * 0.36)
      ctx.lineTo(-s * 0.28, 0)
      ctx.closePath()
      break
    case 'cross': {
      const arm = s * 0.13
      const len = s * 0.34
      ctx.roundRect(-arm, -len, arm * 2, len * 2, arm * 0.9)
      ctx.roundRect(-len, -arm, len * 2, arm * 2, arm * 0.9)
      break
    }
  }
  ctx.fill('evenodd')
}

function buildSprite(config: ShapeConfig): Sprite {
  const blur = Math.max(18, config.size * 0.06)
  const pad = blur * 3
  const half = config.size * 0.55 + pad
  const dim = Math.ceil(half * 2)
  const canvas = document.createElement('canvas')
  canvas.width = dim
  canvas.height = dim
  const ctx = canvas.getContext('2d')!
  ctx.translate(half, half)
  ctx.filter = `blur(${blur}px)`
  ctx.fillStyle = config.color
  drawShape(ctx, config.kind, config.size)
  ctx.filter = 'none'
  return { ...config, canvas, half }
}

export function ManusBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const dotsCanvas = document.createElement('canvas')
    const dotsCtx = dotsCanvas.getContext('2d')
    const shapeCanvas = document.createElement('canvas')
    const shapeCtx = shapeCanvas.getContext('2d')
    const litCanvas = document.createElement('canvas')
    const litCtx = litCanvas.getContext('2d')
    if (!dotsCtx || !shapeCtx || !litCtx) return

    let sprites: Sprite[] = []
    let raf = 0
    let running = true
    let start = performance.now()
    let cssW = 0
    let cssH = 0

    const paintDots = (w: number, h: number) => {
      dotsCanvas.width = Math.max(1, Math.floor(w))
      dotsCanvas.height = Math.max(1, Math.floor(h))
      dotsCtx.clearRect(0, 0, w, h)
      dotsCtx.fillStyle = 'rgba(255,255,255,0.72)'
      const gap = 14
      for (let y = gap; y < h; y += gap) {
        for (let x = gap; x < w; x += gap) {
          dotsCtx.fillRect(x, y, 1.2, 1.2)
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      cssW = window.innerWidth
      cssH = window.innerHeight

      canvas.width = Math.max(1, Math.floor(cssW * dpr))
      canvas.height = Math.max(1, Math.floor(cssH * dpr))
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      shapeCanvas.width = canvas.width
      shapeCanvas.height = canvas.height
      shapeCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      litCanvas.width = Math.max(1, Math.floor(cssW))
      litCanvas.height = Math.max(1, Math.floor(cssH))

      paintDots(cssW, cssH)
      sprites = createConfigs(cssW, cssH).map(buildSprite)
    }

    const render = (now: number) => {
      if (!running) return

      const reduced = reducedMotion.matches
      const t = (now - start) / 1000
      const w = cssW
      const h = cssH

      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, w, h)

      ctx.globalAlpha = 0.06
      ctx.drawImage(dotsCanvas, 0, 0)
      ctx.globalAlpha = 1

      for (const sprite of sprites) {
        const driftX = reduced
          ? 0
          : Math.sin(t * sprite.freqX + sprite.phase) * sprite.ampX +
            Math.sin(t * sprite.freqX * 0.45 + sprite.phase * 1.7) * sprite.ampX * 0.35
        const driftY = reduced
          ? 0
          : Math.cos(t * sprite.freqY + sprite.phase * 0.8) * sprite.ampY +
            Math.cos(t * sprite.freqY * 0.55 + sprite.phase) * sprite.ampY * 0.3
        const rot = reduced ? sprite.rotation : sprite.rotation + t * sprite.spin
        const pulse = reduced ? 0.9 : 0.72 + Math.sin(t * 0.55 + sprite.phase) * 0.28
        const x = sprite.ox + driftX
        const y = sprite.oy + driftY

        shapeCtx.clearRect(0, 0, w, h)
        shapeCtx.save()
        shapeCtx.globalAlpha = pulse
        shapeCtx.translate(x, y)
        shapeCtx.rotate(rot)
        shapeCtx.drawImage(sprite.canvas, -sprite.half, -sprite.half)
        shapeCtx.restore()

        // Soft colored wash
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = 0.22 * pulse
        ctx.drawImage(shapeCanvas, 0, 0, w, h)
        ctx.restore()

        // Colored dotted silhouette
        litCtx.clearRect(0, 0, w, h)
        litCtx.globalCompositeOperation = 'source-over'
        litCtx.drawImage(dotsCanvas, 0, 0)
        litCtx.globalCompositeOperation = 'source-in'
        litCtx.fillStyle = sprite.color
        litCtx.fillRect(0, 0, w, h)
        litCtx.globalCompositeOperation = 'destination-in'
        litCtx.drawImage(shapeCanvas, 0, 0, w, h)
        litCtx.globalCompositeOperation = 'source-over'

        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = 0.55
        ctx.drawImage(litCanvas, 0, 0)
        ctx.restore()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      if (!reduced) raf = requestAnimationFrame(render)
    }

    const kick = () => {
      cancelAnimationFrame(raf)
      running = true
      if (reducedMotion.matches) {
        render(performance.now())
        return
      }
      raf = requestAnimationFrame(render)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
        return
      }
      kick()
    }

    const onMotionChange = () => kick()

    resize()
    kick()

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="manus-backdrop" aria-hidden="true" />
}
