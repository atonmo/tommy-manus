import { getWorkBySlug, type WorkItem } from '../data/works'
import type { CaseMetric } from '../components/case'

import aiNativeDesign from '../content/articles/ai-native-design.md?raw'
import goldenFlow from '../content/articles/golden-flow.md?raw'
import perpetualsLite from '../content/articles/perpetuals-lite.md?raw'
import tencentMeeting from '../content/articles/tencent-meeting.md?raw'
import tencentCloud from '../content/articles/tencent-cloud.md?raw'
import webTrade from '../content/articles/web-trade.md?raw'
import endoscope from '../content/articles/endoscope.md?raw'

const articleSources: Record<string, string> = {
  'ai-native-design': aiNativeDesign,
  'golden-flow': goldenFlow,
  'web-trade': webTrade,
  'perpetuals-lite': perpetualsLite,
  'tencent-meeting': tencentMeeting,
  'tencent-cloud': tencentCloud,
  endoscope,
}

export type ArticleHeroMode = 'image' | 'glass' | 'feather' | 'gradient'

export type ArticleData = {
  slug: string
  work: WorkItem
  markdown: string
  title: string
  start: string
  end: string
  role: string
  description: string
  cover: string
  kicker: string
  dek: string
  platform?: string
  focus?: string
  style?: string
  theme?: 'light' | 'dark'
  hero: ArticleHeroMode
  heroImage?: string
  heroImageAlt?: string
  /** "A|B" → A<em>B</em>; "!A|B" → <em>A</em>B; always inline */
  heroTitle: string
  metrics: CaseMetric[]
}

function parseMetrics(raw: string): CaseMetric[] {
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))

  return lines.map((line) => {
    const payload = line.replace(/^-\s*/, '')
    const [label = '', value = '', flag = ''] = payload.split('|').map((s) => s.trim())
    return {
      label,
      value,
      accent: flag === 'accent',
    }
  })
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {} as Record<string, string>, content: source.trim() }
  }

  const data: Record<string, string> = {}
  const fm = match[1]
  const lines = fm.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    if (/^metrics:\s*$/.test(line)) {
      const metricLines: string[] = []
      i += 1
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        metricLines.push(lines[i].trim())
        i += 1
      }
      data.metrics = metricLines.join('\n')
      continue
    }

    const idx = line.indexOf(':')
    if (idx === -1) {
      i += 1
      continue
    }
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
    i += 1
  }

  return { data, content: match[2].trim() }
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const source = articleSources[slug]
  const work = getWorkBySlug(slug)
  if (!source || !work) return null

  const { data, content } = parseFrontmatter(source)
  const hero =
    data.hero === 'gradient' || !data.hero
      ? 'gradient'
      : data.hero === 'glass'
        ? 'glass'
        : data.hero === 'feather'
          ? 'feather'
          : 'image'

  return {
    slug,
    work,
    markdown: content,
    title: data.title || work.title,
    start: data.start || work.start,
    end: data.end || work.end,
    role: data.role || work.role,
    description: data.description || work.description,
    cover: data.cover || work.cover,
    kicker: data.kicker || work.title,
    dek: data.dek || data.description || work.description,
    platform: data.platform || undefined,
    focus: data.focus || undefined,
    style: data.style || undefined,
    theme: data.theme === 'light' ? 'light' : undefined,
    hero,
    heroImage: data.heroImage || data.cover || work.cover,
    heroImageAlt: data.heroImageAlt || data.title || work.title,
    heroTitle: data.heroTitle || data.title || work.title,
    metrics: data.metrics ? parseMetrics(data.metrics) : [],
  }
}
