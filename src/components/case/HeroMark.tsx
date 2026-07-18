import { useId } from 'react'

/** Protocol3-style hero: deep black + soft silk light ribbons */

function SilkWave({ uid }: { uid: string }) {
  const paths = [
    'M-80 520C120 420 280 380 420 410C580 448 720 520 860 490C980 466 1080 400 1280 340',
    'M-80 545C140 450 300 405 440 432C590 464 730 538 870 510C990 488 1090 422 1280 365',
    'M-80 570C160 478 320 430 460 455C600 482 740 555 880 530C1000 508 1100 445 1280 390',
    'M-80 495C100 400 260 355 400 385C560 422 700 495 840 465C960 442 1060 380 1280 315',
    'M-80 595C180 505 340 455 480 478C620 502 750 572 890 550C1010 530 1110 468 1280 415',
    'M-40 470C160 380 320 340 460 365C610 395 750 460 890 435C1010 415 1115 360 1280 300',
    'M-40 620C200 530 360 480 500 500C640 522 760 590 900 570C1020 552 1120 492 1280 440',
  ]

  return (
    <svg
      className="gf-proto-wave-svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-stroke`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--gf-proto-hi)" stopOpacity="0" />
          <stop offset="28%" stopColor="var(--gf-proto-hi)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="var(--gf-proto-mid)" stopOpacity="0.85" />
          <stop offset="78%" stopColor="var(--gf-proto-hi)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--gf-proto-hi)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-fill`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="var(--gf-proto-mid)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--gf-proto-mid)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--gf-proto-lo)" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-blur`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${uid}-soft`} x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      <path
        d="M-100 380C200 280 420 250 620 320C820 390 980 360 1300 240L1300 800L-100 800Z"
        fill={`url(#${uid}-fill)`}
        filter={`url(#${uid}-blur)`}
        opacity="0.9"
      />

      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={`url(#${uid}-stroke)`}
          strokeWidth={i % 3 === 0 ? 1.6 : 1.1}
          strokeLinecap="round"
          opacity={0.35 + (i % 4) * 0.1}
          filter={i < 3 ? `url(#${uid}-soft)` : undefined}
        />
      ))}
    </svg>
  )
}

export function HeroGradientVisual() {
  const uid = useId().replace(/:/g, '')

  return (
    <div className="gf-proto" aria-hidden="true">
      <div className="gf-proto-base" />
      <div className="gf-proto-flare gf-proto-flare-tl" />
      <div className="gf-proto-flare gf-proto-flare-tr" />
      <div className="gf-proto-flare gf-proto-flare-br" />
      <div className="gf-proto-wave">
        <SilkWave uid={uid} />
      </div>
      <div className="gf-proto-noise" />
      <div className="gf-proto-vignette" />
    </div>
  )
}
