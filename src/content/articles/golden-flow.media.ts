import type { ArticleMediaItem } from './web-trade.media'

/** Media registry for golden-flow — edit paths here; MD only uses [[img:id]]. */
export const goldenFlowMedia: Record<string, ArticleMediaItem> = {
  'targets-map': {
    src: '/articles/golden-flow/16-targets-map.svg',
    alt: '业务 × 用户 × 设计目标地图',
    caption: 'Goals · Business ∩ User × Design',
  },
  'method-stack': {
    src: '/articles/golden-flow/03-method-stack.svg',
    alt: '黄金流程设计方法',
  },
  funnel: {
    src: '/articles/golden-flow/02-funnel.svg',
    alt: '首交黄金链路漏斗：注册 KYC → 入金 → 下单 → 成功交易',
  },
  'bj-fogg': {
    src: '/articles/golden-flow/04-bj-fogg.svg',
    alt: 'Fogg 行为模型定性分析',
    caption: 'Qualitative · BJ Fogg',
  },
  quantitative: {
    src: '/articles/golden-flow/05-quantitative.svg',
    alt: '注册转化与用户关注点数据',
    caption: 'Quantitative · Register / KYC / Landing',
  },
  'register-retain': {
    src: '/articles/golden-flow/06-register-retain.jpg',
    alt: '注册退出挽留',
    caption: 'Retain · Rewards + Time cost',
  },
  'register-task': {
    src: '/articles/golden-flow/18-zhuce1.svg',
    alt: '聚焦注册任务：未开始 / 进行中 / 已完成',
    caption: 'Focus · Registration reward task',
  },
  safety: {
    src: '/articles/golden-flow/07-safety.jpg',
    alt: '安全教育',
    caption: 'Trust · Safety reserve education',
  },
  'kyc-progress': {
    src: '/articles/golden-flow/08-kyc-progress.jpg',
    alt: 'KYC 进度可视化',
    caption: 'Progress · KYC visible + incentivized',
  },
  'deposit-data': {
    src: '/articles/golden-flow/09-deposit-data.svg',
    alt: '入金场景点击分布',
    caption: 'Insight · Where deposit intent happens',
  },
  rujin: {
    src: '/articles/golden-flow/19-rujin.png',
    alt: '入金引导方案',
    caption: 'UX · Deposit guidance',
  },
  'deposit-ux': {
    src: '/articles/golden-flow/10-deposit-ux.jpg',
    alt: '首页与交易页入金引导',
    caption: 'UX · Deposit at decision moment',
  },
  'deposit-touchpoints': {
    src: '/articles/golden-flow/19-rujin.png',
    alt: '入金触点：行情 / 首页 / 交易 / 资产',
  },
  kline: {
    src: '/articles/golden-flow/20-kline.png',
    alt: 'K 线页停留洞察',
    caption: 'Insight · Longest dwell on chart',
  },
  competitors: {
    src: '/articles/golden-flow/20-kline2.png',
    alt: '竞品快捷下单对比',
    caption: 'Competitors · Quick order is table stakes',
  },
  'order-modes': {
    src: '/articles/golden-flow/20-kline3.png',
    alt: '经典 / 快捷 / Ultra 模式',
    caption: 'Design · Classic / Quick / Ultra',
  },
  'launch-effect': {
    src: '/articles/golden-flow/20-kline4.png',
    alt: '上线两周转化效果',
    caption: 'Launch · 42.5% vs panel 43.2%',
  },
  outcome: {
    src: '/articles/golden-flow/15-outcome.svg',
    alt: '三侧目标对齐，拉动交易量',
    caption: 'Result · User × Business × Design → Volume',
  },
}
