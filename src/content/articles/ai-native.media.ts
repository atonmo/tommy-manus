import type { ArticleMediaItem } from './web-trade.media'
import journeyPng from '../../assets/articles/ai-native-design/01-journey.png'
import skillFlowPng from '../../assets/articles/ai-native-design/02-skill-flow.png'
import mistakePng from '../../assets/articles/ai-native-design/10-mistake.png'

/** Media registry for ai-native-design — durable ids for MD: [[img:journey]] / [[embed:two-skills]] */
export const aiNativeMedia: Record<string, ArticleMediaItem> = {
  journey: {
    src: journeyPng,
    alt: '探索路径',
    caption: 'Journey · From exploration to direction',
  },
  'skill-flow': {
    src: skillFlowPng,
    alt: '写出好用 Skill 的准则',
    caption: 'Skill · Writing principles',
  },
  'two-skills': {
    src: '/articles/ai-native-design/03-two-skills.html?embed=1',
    alt: '两个可复用 Skill：PRD → Prompt / Design Review',
    caption: 'Skills · Prompt · Review',
    embed: true,
    tall: true,
  },
  'skill-effort': {
    src: '/articles/ai-native-design/04-skill-effort.html?embed=1',
    alt: '两个 Skill 的提效区间',
    caption: 'Impact · Person-day saved',
    embed: true,
  },
  'demo-flow': {
    src: '/articles/ai-native-design/05-demo-flow.html?embed=1&flush=1',
    alt: '第一个版本路径：Figma 组件 → 关联语义 → 生成可交互页面',
    embed: true,
    flush: true,
  },
  'route-shift': {
    src: '/articles/ai-native-design/06-route-shift.html?embed=1&flush=1',
    alt: '放弃 Demo 路线，转向路线 B 真实代码',
    embed: true,
    flush: true,
  },
  mistake: {
    src: mistakePng,
    alt: '过度索引的 Skill 行为：读 Skill → 跳文件 → 漏掉红线',
    caption: 'Failure · Over-indexed Skill path',
  },
  'refactor-diff': {
    src: '/articles/ai-native-design/08-refactor-diff.html?embed=1&flush=1',
    alt: 'Skill 重构前后对比：文件结构、AI Read、规则遗漏',
    embed: true,
    flush: true,
  },
  'monitor-flip': {
    src: '/articles/monitor-flip/index.html?embed=1&flush=1',
    alt: '生成效果展示：电脑屏幕内页面翻页演示',
    embed: true,
    flush: true,
  },
}

