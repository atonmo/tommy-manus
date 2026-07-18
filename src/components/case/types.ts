import type { ReactNode } from 'react'

export type CaseMetric = {
  label: string
  value: string
  accent?: boolean
}

export type CaseMedia = {
  src: string
  alt: string
  caption?: string
  className?: string
}

export type CaseReflectionPoint = {
  idx: string
  title: string
  body: string
}

export type CaseHeroProps = {
  kicker: string
  title: ReactNode
  dek: ReactNode
  meta: string[]
  metrics: CaseMetric[]
  visual: ReactNode
  glowClassName?: string
  visualClassName?: string
  heroClassName?: string
}
