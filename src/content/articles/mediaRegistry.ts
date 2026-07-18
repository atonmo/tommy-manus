import { webTradeMedia, type ArticleMediaItem } from './web-trade.media'
import { aiNativeMedia } from './ai-native.media'

export type { ArticleMediaItem }

const mediaBySlug: Record<string, Record<string, ArticleMediaItem>> = {
  'web-trade': webTradeMedia,
  'ai-native-design': aiNativeMedia,
}

export function getArticleMedia(
  slug: string,
  id: string,
): ArticleMediaItem | null {
  return mediaBySlug[slug]?.[id] ?? null
}
