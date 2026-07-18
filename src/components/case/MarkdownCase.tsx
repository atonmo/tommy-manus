import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { createContext, useContext } from 'react'
import type { ArticleData } from '../../lib/articles'
import { getArticleMedia } from '../../content/articles/mediaRegistry'
import { CaseShell } from './CaseShell'
import { CaseHero } from './CaseHero'
import { MediaBlock } from './MediaBlock'
import { EmbedBlock } from './EmbedBlock'
import { CaseReflection } from './CaseReflection'
import { formatCaseKicker, formatCaseMeta } from './meta'
import { HeroGradientVisual } from './HeroMark'

import '../../styles/case-web-trade.css'
import '../../styles/case-perpetuals-lite.css'
import '../../styles/case-tencent-meeting.css'
import '../../styles/case-tencent-cloud.css'
import '../../styles/case-ai-native.css'
import '../../styles/case-golden-flow.css'
import '../../styles/case-endoscope.css'

type BodyBlock =
  | { kind: 'md'; source: string }
  | { kind: 'cards'; items: { id: string; title: string; body: string }[] }
  | { kind: 'subcards'; items: { title: string; body: string }[] }
  | { kind: 'stats'; items: { value: string; label: string }[] }
  | { kind: 'problem-cards'; items: { title: string; body: string; phase?: string }[] }
  | {
      kind: 'media'
      src: string
      alt: string
      caption?: string
      /** Optional prose rendered directly above the media */
      lead?: string
      embed?: boolean
      tall?: boolean
      flush?: boolean
      frame?: boolean
    }

const IMAGE_LINE_RE =
  /^!\[([^\]]*)\]\((embed:)?([^)\s]+)(?:\s+(?:"([^"]*)"|'([^']*)'))?\)\s*$/
const IMG_COMMENT_RE =
  /^<!--\s*(img|embed):\s*(\S+)\s*(?:\|\s*([^|]*?))?\s*(?:\|\s*([^|]*?))?\s*(?:\|\s*([\s\S]*?))?\s*-->$/
const MEDIA_REF_RE = /^\[\[(img|embed):([\w-]+)\]\]$/
const STATS_RE = /^\[\[stats:([\s\S]+)\]\]$/
const PROBLEM_CARDS_RE = /^\[\[problem-cards\]\]$/
const PROBLEM_CARD_ITEM_RE = /^-\s+\*\*(.+?)\*\*\s*(?:\{(.+?)\}\s*)?(.*)$/
type CaseSectionModel = {
  kind: 'section'
  variant: 'head' | 'step'
  label: string
  title: string
  lead?: string
  blocks: BodyBlock[]
}

type ReflectionModel = {
  kind: 'reflection'
  title: string
  body: string
  points: { idx: string; title: string; body: string }[]
}

type DocPart = CaseSectionModel | ReflectionModel

const STYLE_MAP: Record<
  string,
  { page: string; caseName: string; glow?: string; visual?: string; hero?: string; media?: string }
> = {
  'web-trade': {
    page: 'wt-page',
    caseName: 'wt-case',
    glow: 'wt-hero-glow',
    visual: 'gf-hero-gradient',
  },
  'perpetuals-lite': {
    page: 'pl-page',
    caseName: 'pl-case',
    glow: 'pl-hero-glow',
    visual: 'gf-hero-gradient',
    hero: 'pl-hero',
  },
  'tencent-meeting': {
    page: 'tm-page',
    caseName: 'tm-case',
    glow: 'tm-hero-glow',
    visual: 'gf-hero-gradient',
    hero: 'tm-hero',
  },
  'tencent-cloud': {
    page: 'tc-page',
    caseName: 'tc-case',
    glow: 'tc-hero-glow',
    visual: 'gf-hero-gradient',
    hero: 'tc-hero',
  },
  'ai-native-design': {
    page: 'an-page',
    caseName: 'an-case',
    glow: 'an-hero-glow',
    visual: 'gf-hero-gradient',
    hero: 'an-hero',
    media: 'an-media',
  },
  'golden-flow': {
    page: '',
    caseName: '',
    visual: 'gf-hero-gradient',
  },
  endoscope: {
    page: 'endo-page',
    caseName: 'endo-case',
    glow: 'endo-hero-glow',
    visual: 'gf-hero-gradient',
  },
}

function splitLabelTitle(header: string): { label: string; title: string } {
  const parts = header.split('·').map((s) => s.trim())
  if (parts.length === 1) return { label: parts[0], title: parts[0] }
  return { label: parts[0], title: parts.slice(1).join(' · ') }
}

function isStepLabel(label: string) {
  return /^\d/.test(label) || /^[A-Z]\.\d/.test(label)
}

function extractLead(body: string): { lead?: string; rest: string } {
  const lines = body.split('\n')
  if (!lines[0]?.trim().startsWith('>')) return { rest: body }

  const leadLines: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') {
      if (leadLines.length) {
        i += 1
        break
      }
      i += 1
      continue
    }
    if (!line.trim().startsWith('>')) break
    leadLines.push(line.replace(/^\s*>\s?/, ''))
    i += 1
  }
  return {
    lead: leadLines.join(' ').replace(/\s+/g, ' ').trim(),
    rest: lines.slice(i).join('\n').trim(),
  }
}

function parseImageLine(
  line: string,
  slug?: string,
): Extract<BodyBlock, { kind: 'media' }> | null {
  const trimmed = line.trim()

  const ref = trimmed.match(MEDIA_REF_RE)
  if (ref && slug) {
    const kind = ref[1]
    const id = ref[2]
    const item = getArticleMedia(slug, id)
    if (!item) return null
    const isEmbed = kind === 'embed' || item.embed || /\.html(?:[?#]|$)/i.test(item.src)
    if (isEmbed) {
      const { src, tall, flush, frame } = parseEmbedSrc(
        item.src.startsWith('embed:') ? item.src : `embed:${item.src}`,
      )
      return {
        kind: 'media',
        src,
        alt: item.alt,
        caption: item.caption,
        lead: item.lead,
        embed: true,
        tall: item.tall ?? tall,
        flush: item.flush ?? flush,
        frame: item.frame ?? frame,
      }
    }
    return {
      kind: 'media',
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      lead: item.lead,
    }
  }

  const comment = trimmed.match(IMG_COMMENT_RE)
  if (comment) {
    const kind = comment[1]
    const rawSrc = (comment[2] ?? '').trim()
    const alt = (comment[3] ?? '').trim()
    const caption = (comment[4] ?? '').trim() || undefined
    const lead = (comment[5] ?? '').trim() || undefined
    if (kind === 'embed' || /\.html(?:[?#]|$)/i.test(rawSrc)) {
      const { src, tall, flush, frame } = parseEmbedSrc(
        rawSrc.startsWith('embed:') ? rawSrc : `embed:${rawSrc}`,
      )
      return { kind: 'media', src, alt, caption, lead, embed: true, tall, flush, frame }
    }
    return { kind: 'media', src: rawSrc, alt, caption, lead }
  }

  const match = trimmed.match(IMAGE_LINE_RE)
  if (!match) return null

  const alt = match[1] ?? ''
  const isEmbedPrefix = Boolean(match[2])
  const rawSrc = match[3] ?? ''
  const caption = match[4] || match[5] || undefined
  const isEmbed = isEmbedPrefix || /\.html(?:[?#]|$)/i.test(rawSrc)

  if (isEmbed) {
    const raw = isEmbedPrefix ? `embed:${rawSrc}` : `embed:${rawSrc}`
    const { src, tall, flush, frame } = parseEmbedSrc(raw)
    return { kind: 'media', src, alt, caption, embed: true, tall, flush, frame }
  }

  return { kind: 'media', src: rawSrc, alt, caption }
}

function tokenizeBody(source: string, slug?: string): BodyBlock[] {
  if (!source.trim()) return []

  const lines = source.split('\n')
  const blocks: BodyBlock[] = []
  let mdBuf: string[] = []

  const flushMd = () => {
    const text = mdBuf.join('\n').trim()
    if (text) blocks.push({ kind: 'md', source: text })
    mdBuf = []
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const image = parseImageLine(line, slug)

    if (image) {
      flushMd()
      blocks.push(image)
      i += 1
      continue
    }

    const stats = line.trim().match(STATS_RE)
    if (stats) {
      flushMd()
      const items = stats[1]
        .split(';;')
        .map((part) => {
          const [value = '', label = ''] = part.split('|').map((s) => s.trim())
          return { value, label }
        })
        .filter((item) => item.value)
      if (items.length) blocks.push({ kind: 'stats', items })
      i += 1
      continue
    }

    if (PROBLEM_CARDS_RE.test(line.trim())) {
      flushMd()
      i += 1
      while (i < lines.length && lines[i].trim() === '') i += 1
      const items: { title: string; body: string; phase?: string }[] = []
      while (i < lines.length) {
        const itemMatch = lines[i].match(PROBLEM_CARD_ITEM_RE)
        if (!itemMatch) break
        items.push({
          title: itemMatch[1].trim(),
          phase: itemMatch[2]?.trim() || undefined,
          body: itemMatch[3].trim(),
        })
        i += 1
      }
      if (items.length) blocks.push({ kind: 'problem-cards', items })
      continue
    }

    if (/^### /.test(line) && !/^#### /.test(line)) {
      flushMd()
      const cards: { id: string; title: string; body: string }[] = []
      while (i < lines.length && /^### /.test(lines[i]) && !/^#### /.test(lines[i])) {
        const header = lines[i].replace(/^###\s+/, '').trim()
        const { label: id, title } = splitLabelTitle(header)
        i += 1
        while (i < lines.length && lines[i].trim() === '') i += 1
        const bodyLines: string[] = []
        while (
          i < lines.length &&
          lines[i].trim() !== '' &&
          !/^#{2,4} /.test(lines[i]) &&
          !parseImageLine(lines[i], slug) &&
          !/^>-/.test(lines[i]) &&
          !/^\|/.test(lines[i]) &&
          !/^[-*] /.test(lines[i])
        ) {
          bodyLines.push(lines[i])
          i += 1
        }
        cards.push({ id, title: title === id ? '' : title || id, body: bodyLines.join('\n').trim() })
        while (i < lines.length && lines[i].trim() === '') i += 1
      }
      if (cards.length) blocks.push({ kind: 'cards', items: cards })
      continue
    }

    if (/^#### /.test(line)) {
      flushMd()
      const subcards: { title: string; body: string }[] = []
      while (i < lines.length && /^#### /.test(lines[i])) {
        const title = lines[i].replace(/^####\s+/, '').trim()
        i += 1
        while (i < lines.length && lines[i].trim() === '') i += 1
        const bodyLines: string[] = []
        while (
          i < lines.length &&
          lines[i].trim() !== '' &&
          !/^#{2,4} /.test(lines[i]) &&
          !parseImageLine(lines[i], slug) &&
          !/^\|/.test(lines[i]) &&
          !/^[-*] /.test(lines[i])
        ) {
          bodyLines.push(lines[i])
          i += 1
        }
        subcards.push({ title, body: bodyLines.join('\n').trim() })
        while (i < lines.length && lines[i].trim() === '') i += 1
      }
      if (subcards.length) blocks.push({ kind: 'subcards', items: subcards })
      continue
    }

    mdBuf.push(line)
    i += 1
  }

  flushMd()
  return blocks
}

function parseDoc(markdown: string, slug?: string): DocPart[] {
  const chunks = markdown.split(/^## /m).filter((c) => c.trim())
  return chunks.map((chunk) => {
    const nl = chunk.indexOf('\n')
    const header = (nl === -1 ? chunk : chunk.slice(0, nl)).trim()
    const rawBody = nl === -1 ? '' : chunk.slice(nl + 1).trim()
    const { label, title } = splitLabelTitle(header)

    if (/^design reflection$/i.test(label) || /^reflection$/i.test(label)) {
      const { lead, rest } = extractLead(rawBody)
      const blocks = tokenizeBody(rest, slug)
      const points = blocks
        .filter((b): b is Extract<BodyBlock, { kind: 'cards' }> => b.kind === 'cards')
        .flatMap((b) =>
          b.items.map((item) => ({
            idx: item.id,
            title: item.title || item.id,
            body: item.body,
          })),
        )
      const bodyParts = blocks
        .filter((b) => b.kind === 'md')
        .map((b) => (b as Extract<BodyBlock, { kind: 'md' }>).source)
      const body = [lead, ...bodyParts].filter(Boolean).join('\n\n')
      return {
        kind: 'reflection',
        title,
        body,
        points,
      } satisfies ReflectionModel
    }

    const { lead, rest } = extractLead(rawBody)
    return {
      kind: 'section',
      variant: isStepLabel(label) ? 'step' : 'head',
      label,
      title,
      lead,
      blocks: tokenizeBody(rest, slug),
    } satisfies CaseSectionModel
  })
}

function renderHeroTitle(heroTitle: string) {
  // "!A|B" → <em>A</em>B   "A||B" / "A|B" → A<em>B</em> (always inline)
  const accentFirst = heroTitle.startsWith('!')
  const raw = accentFirst ? heroTitle.slice(1) : heroTitle
  const sep = raw.includes('||') ? '||' : raw.includes('|') ? '|' : null
  if (sep) {
    const [first, ...rest] = raw.split(sep)
    const a = first.trim()
    const b = rest.join(sep).trim()
    return accentFirst ? (
      <>
        <em>{a}</em>
        {b}
      </>
    ) : (
      <>
        {a}
        <em>{b}</em>
      </>
    )
  }
  return accentFirst ? <em>{raw.trim()}</em> : heroTitle
}

function parseEmbedSrc(raw: string) {
  const without = raw.replace(/^embed:/, '')
  let tall = false
  let flush = false
  let frame = false
  let src = without

  try {
    const url = new URL(without, 'https://case.local')
    tall = url.searchParams.get('tall') === '1' || url.searchParams.has('tall')
    flush = url.searchParams.get('flush') === '1' || url.searchParams.has('flush')
    frame = url.searchParams.get('frame') === '1' || url.searchParams.has('frame')
    url.searchParams.delete('tall')
    url.searchParams.delete('flush')
    url.searchParams.delete('frame')
    const q = url.searchParams.toString()
    src = `${url.pathname}${q ? `?${q}` : ''}`
  } catch {
    const [pathPart, hash = ''] = without.split('#')
    const flags = new Set(hash.split(/[#&]/).filter(Boolean))
    tall = flags.has('tall')
    flush = flags.has('flush')
    frame = flags.has('frame')
    src = pathPart
  }

  return { src, tall, flush, frame }
}

function caseUrlTransform(url: string) {
  if (url.startsWith('embed:')) return url
  // Allow relative article assets and query strings used by embeds.
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return url
  if (/^https?:\/\//i.test(url) || url.startsWith('mailto:')) return url
  return ''
}

const InCalloutContext = createContext(false)

function MarkdownChunk({
  source,
  mediaClassName,
}: {
  source: string
  mediaClassName?: string
}) {
  const components: Components = {
    p: ({ node, children }) => {
      const inCallout = useContext(InCalloutContext)
      const kids = node?.children ?? []
      const onlyImg =
        kids.length === 1 &&
        kids[0]?.type === 'element' &&
        (kids[0] as { tagName?: string }).tagName === 'img'
      if (onlyImg) return <>{children}</>

      const onlyStrong =
        kids.length === 1 &&
        kids[0]?.type === 'element' &&
        (kids[0] as { tagName?: string }).tagName === 'strong'
      if (onlyStrong && !inCallout) return <h3 className="gf-subhead">{children}</h3>

      return <p className="gf-prose">{children}</p>
    },
    img: ({ src, alt, title }) => {
      if (!src) return null
      return (
        <MediaBlock
          src={src}
          alt={alt || ''}
          caption={title || undefined}
          className={mediaClassName}
        />
      )
    },
    ul: ({ children }) => <ul className="gf-list">{children}</ul>,
    ol: ({ children }) => <ol className="gf-list">{children}</ol>,
    blockquote: ({ children }) => (
      <InCalloutContext.Provider value={true}>
        <blockquote className="wt-callout">{children}</blockquote>
      </InCalloutContext.Provider>
    ),
    table: ({ children }) => (
      <div className="gf-table-wrap">
        <table className="gf-table">{children}</table>
      </div>
    ),
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={caseUrlTransform} components={components}>
      {source}
    </ReactMarkdown>
  )
}

function SectionBlocks({
  blocks,
  mediaClassName,
  cardsVariant = 'default',
}: {
  blocks: BodyBlock[]
  mediaClassName?: string
  cardsVariant?: 'default' | 'inventory'
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === 'cards') {
          const isInventory = cardsVariant === 'inventory'
          return (
            <div
              className={['gf-target-grid', isInventory ? 'an-base-grid' : ''].filter(Boolean).join(' ')}
              key={`cards-${index}`}
            >
              {block.items.map((item, cardIndex) =>
                isInventory ? (
                  <article className="an-base-card" key={`${item.id}-${item.title}`}>
                    <span className="an-base-num" aria-hidden="true">
                      {String(cardIndex + 1).padStart(2, '0')}
                    </span>
                    <h3 className="an-base-title">
                      <span className="an-base-zh">{item.id}</span>
                      {item.title ? (
                        <>
                          <span className="an-base-sep" aria-hidden="true">
                            {' / '}
                          </span>
                          <span className="an-base-en">{item.title}</span>
                        </>
                      ) : null}
                    </h3>
                    {item.body ? <p className="an-base-body">{item.body}</p> : null}
                  </article>
                ) : (
                  <article className="gf-target-card" key={`${item.id}-${item.title}`}>
                    <p className="gf-target-id">{item.id}</p>
                    {item.title ? <h3 className="gf-target-title">{item.title}</h3> : null}
                    {item.body ? <p className="gf-target-body">{item.body}</p> : null}
                  </article>
                ),
              )}
            </div>
          )
        }
        if (block.kind === 'stats') {
          return (
            <div className="gf-stats-row" key={`stats-${index}`}>
              {block.items.map((item) => (
                <div className="gf-stat" key={`${item.value}-${item.label}`}>
                  <span className="gf-stat-value">{item.value}</span>
                  <span className="gf-stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          )
        }
        if (block.kind === 'problem-cards') {
          return (
            <ul className="pl-problem-cards" key={`problem-cards-${index}`}>
              {block.items.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  {item.body}
                  {item.phase ? <span className="pl-problem-phase">{item.phase}</span> : null}
                </li>
              ))}
            </ul>
          )
        }
        if (block.kind === 'subcards') {
          return (
            <div className="gf-subgrid" key={`sub-${index}`}>
              {block.items.map((item) => (
                <div className="gf-subcard" key={item.title}>
                  <h4>{item.title}</h4>
                  {item.body ? <p>{item.body}</p> : null}
                </div>
              ))}
            </div>
          )
        }
        if (block.kind === 'media') {
          const media = block.embed ? (
            <EmbedBlock
              src={block.src}
              title={block.alt || 'Embed'}
              caption={block.caption}
              tall={block.tall}
              flush={block.flush}
              frame={block.frame}
            />
          ) : (
            <MediaBlock
              src={block.src}
              alt={block.alt}
              caption={block.caption}
              className={mediaClassName}
            />
          )
          if (!block.lead) {
            return <div key={`media-${index}-${block.src}`}>{media}</div>
          }
          return (
            <div key={`media-${index}-${block.src}`} className="gf-media-with-lead">
              <p className="gf-prose">{block.lead}</p>
              {media}
            </div>
          )
        }
        return <MarkdownChunk key={`md-${index}`} source={block.source} mediaClassName={mediaClassName} />
      })}
    </>
  )
}

export function MarkdownCase({ article }: { article: ArticleData }) {
  const style = STYLE_MAP[article.style ?? ''] ?? STYLE_MAP['golden-flow']
  const parts = parseDoc(article.markdown, article.slug)
  const kickerLabel = article.kicker.replace(/^Case\s+\d+\s*·\s*/i, '').trim()

  const visual = <HeroGradientVisual />

  return (
    <CaseShell
      pageClassName={style.page || undefined}
      caseClassName={style.caseName || undefined}
      accent={article.work.accent}
    >
      <CaseHero
        kicker={formatCaseKicker(article.slug, kickerLabel)}
        title={renderHeroTitle(article.heroTitle)}
        dek={article.dek}
        meta={formatCaseMeta(article.slug, {
          platform: article.platform,
          focus: article.focus,
        })}
        metrics={article.metrics}
        glowClassName={style.glow}
        visualClassName={style.visual || 'gf-hero-gradient'}
        heroClassName={style.hero}
        visual={visual}
      />

      {parts.map((part, index) => {
        if (part.kind === 'reflection') {
          return (
            <CaseReflection
              key={`ref-${index}`}
              title={part.title}
              body={part.body}
              points={part.points}
            />
          )
        }

        const secSlug = part.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')

        return (
          <section
            className={[
              'gf-section',
              part.blocks.length === 0 ? 'is-empty' : '',
              secSlug ? `gf-sec-${secSlug}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={`sec-${index}`}
          >
            {part.variant === 'step' ? (
              <div className="gf-step-label">
                <span className="gf-step-num">{part.label}</span>
                <h2 className="gf-step-name">{part.title}</h2>
              </div>
            ) : (
              <header className="gf-section-head">
                <p className="gf-mono-label">{part.label}</p>
                <h2 className="gf-section-title">{part.title}</h2>
                {part.lead ? <p className="gf-section-lead">{part.lead}</p> : null}
              </header>
            )}
            <SectionBlocks
              blocks={part.blocks}
              mediaClassName={style.media}
              cardsVariant={/^prep$/i.test(part.label) ? 'inventory' : 'default'}
            />
          </section>
        )
      })}
    </CaseShell>
  )
}
