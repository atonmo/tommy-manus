import { webTradeMedia, type ArticleMediaItem } from './web-trade.media'
import { aiNativeMedia } from './ai-native.media'
import { perpetualsLiteMedia } from './perpetuals-lite.media'
import { goldenFlowMedia } from './golden-flow.media'
import { tencentMeetingMedia } from './tencent-meeting.media'
import { tencentCloudMedia } from './tencent-cloud.media'

export type { ArticleMediaItem }

const mediaBySlug: Record<string, Record<string, ArticleMediaItem>> = {
  'web-trade': webTradeMedia,
  'ai-native-design': aiNativeMedia,
  'perpetuals-lite': perpetualsLiteMedia,
  'golden-flow': goldenFlowMedia,
  'tencent-meeting': tencentMeetingMedia,
  'tencent-cloud': tencentCloudMedia,
}

export function getArticleMedia(
  slug: string,
  id: string,
): ArticleMediaItem | null {
  return mediaBySlug[slug]?.[id] ?? null
}

/** Recover media when markdown collapses to plain alt text. */
export function getArticleMediaByAlt(
  slug: string,
  alt: string,
): ArticleMediaItem | null {
  const bag = mediaBySlug[slug]
  if (!bag) return null
  const needle = alt.trim()
  if (!needle) return null
  for (const item of Object.values(bag)) {
    if (item.alt === needle) return item
  }
  return null
}

/** Split a line that concatenates several registered alts (common paste/edit glitch). */
export function splitConcatenatedMediaAlts(
  slug: string,
  line: string,
): ArticleMediaItem[] {
  const bag = mediaBySlug[slug]
  if (!bag) return []
  const alts = Object.values(bag)
    .map((item) => item.alt)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)

  let rem = line.trim()
  const found: ArticleMediaItem[] = []
  while (rem) {
    let hit: ArticleMediaItem | null = null
    for (const alt of alts) {
      if (rem.startsWith(alt)) {
        hit = getArticleMediaByAlt(slug, alt)
        rem = rem.slice(alt.length)
        break
      }
    }
    if (!hit) break
    found.push(hit)
  }
  return rem === '' && found.length >= 2 ? found : []
}
