import type { ArticleMediaItem } from './web-trade.media'

/** Media registry for tencent-cloud — edit paths here; MD prefers [[img:id]]. */
export const tencentCloudMedia: Record<string, ArticleMediaItem> = {
  frontline: {
    src: '/articles/tencent-cloud/02-healthcode-frontline.jpg',
    alt: '四川天府健康通：2021 年初项目一线现场',
    caption: 'Frontline · Sichuan Tianfu Health Pass · 2021',
  },
  'healthcode-flow': {
    src: '/articles/tencent-cloud/03-healthcode-flow.jpg',
    alt: '制定健康码规范与亮码流程',
    caption: 'Standards · Scenario Flow · Mini Program Spec',
  },
  'aging-friendly': {
    src: '/articles/tencent-cloud/04-aging-friendly.jpg',
    alt: '适老化设计：关怀模式前后对比与媒体反馈',
    caption: 'Care Mode · Before / After · Media Recognition',
  },
  consoles: {
    src: '/articles/tencent-cloud/05-consoles.jpg',
    alt: '负责腾讯云多个控制台项目',
    caption: 'Consoles · Overview · Data · Query · Monitoring',
  },
  'yunzhi-upgrade': {
    src: '/articles/tencent-cloud/06-yunzhi-upgrade.jpg',
    alt: '腾讯云知识平台品牌升级与成果数据',
    caption: 'Yunzhi · Brand Upgrade · Management Breakthrough Award',
  },
  'yunzhi-brand': {
    src: '/articles/tencent-cloud/07-yunzhi-brand.jpg',
    alt: '云知品牌升级提案概览',
    caption: 'Brand System · Visual Identity · Multi-touchpoint',
  },
  tdesign: {
    src: '/articles/tencent-cloud/08-tdesign.jpg',
    alt: 'TDesign 政务行业组件与规范设定',
    caption: 'TDesign · GSD Mini Program Spec · Government Industry',
  },
  'gov-industry': {
    src: '/articles/tencent-cloud/09-gov-industry.jpg',
    alt: '负责整个腾讯云政务行业设计',
    caption: 'Government Industry · Dashboards · Platforms · Mobile',
  },
  'team-reports': {
    src: '/articles/tencent-cloud/10-team-reports.jpg',
    alt: '团队项目喜报与协作沉淀',
    caption: 'Team Ritual · Success Reports · Collaboration Cadence',
  },
  'isv-quality': {
    src: '/articles/tencent-cloud/11-isv-quality.jpg',
    alt: '参与制定腾讯云 ISV 质量体系设计部分',
    caption: 'ISV Quality · Design Checklist · Auditability',
  },
}
