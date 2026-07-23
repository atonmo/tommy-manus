import type { ArticleMediaItem } from './web-trade.media'

/** Media registry for perpetuals-lite — edit paths here; MD only uses [[img:id]]. */
export const perpetualsLiteMedia: Record<string, ArticleMediaItem> = {
  'user-shift': {
    src: '/articles/perpetuals-lite/07-user-shift.svg',
    alt: '从意愿用户到自主用户的转变',
  },
  competitor: {
    src: '/articles/perpetuals-lite/09-competitor-design.svg',
    alt: '三家移动端截图与设计对照',
  },
  'trade-flow': {
    src: '/articles/perpetuals-lite/10-trade-flow.svg',
    alt: '极简下单链路',
  },
  'visual-language': {
    src: '/articles/perpetuals-lite/11-visual-language.svg',
    alt: '视觉语言提炼 · 安全 / 专业 / 信任',
  },
  'icon-redesign': {
    src: '/articles/perpetuals-lite/13-icon1.svg',
    alt: '图标重塑 · 规格说明与部分图标展示',
  },
  'icon-showcase': {
    src: '/articles/perpetuals-lite/14-icon2.svg',
    alt: '图标体系 · 部分图标展示',
  },
  'data-feedback': {
    src: '/articles/perpetuals-lite/15-data-feedback.svg',
    alt: '灰度数据反馈 · 首交完成与风控触达',
  },
  'guide-feedback': {
    src: '/articles/perpetuals-lite/26-guide-feedback.svg',
    alt: '新手引导教学数据反馈',
  },
  'home-design': {
    src: '/articles/perpetuals-lite/16-home-design.svg',
    alt: '首页设计说明 · 行情前置 / 趋势占屏 / 开多开空收敛',
  },
  'order-design': {
    src: '/articles/perpetuals-lite/17-order-design.svg',
    alt: '下单页设计说明 · 成本换算 / 参数填写 / 确认开仓',
  },
  'position-design': {
    src: '/articles/perpetuals-lite/18-position-design.svg',
    alt: '仓位信息设计说明 · 盈亏前置 / 风险可读 / 一键平仓',
  },
  detail: {
    src: '/articles/perpetuals-lite/21-detail.svg',
    alt: '订单列表 · 仓位卡片设计说明',
  },
  'leverage-slider': {
    src: '/articles/perpetuals-lite/19-leverage-slider.html?embed=1&frame=1',
    alt: '杠杆拖动动效 · ≤50 绿 / >50 黄 / >80 红',
    caption: '杠杆设置',
    embed: true,
    frame: true,
  },
  'tpsl-drag': {
    src: '/articles/perpetuals-lite/20-tpsl-drag.html?embed=1&frame=1',
    alt: '止盈止损拖拽设价动效',
    caption: '止盈止损设置',
    embed: true,
    frame: true,
  },
  'guide-long': {
    src: '/articles/perpetuals-lite/22-guide-long.html?embed=1&frame=1',
    alt: '新手引导 · What is Long?',
    caption: '开多',
    embed: true,
    frame: true,
  },
  'guide-short': {
    src: '/articles/perpetuals-lite/23-guide-short.html?embed=1&frame=1',
    alt: '新手引导 · What is Short?',
    caption: '开空',
    embed: true,
    frame: true,
  },
  'guide-leverage': {
    src: '/articles/perpetuals-lite/24-guide-leverage.html?embed=1&frame=1',
    alt: '新手引导 · What is Leverage?',
    caption: '杠杆',
    embed: true,
    frame: true,
  },
  'guide-liquidation': {
    src: '/articles/perpetuals-lite/25-guide-liquidation.html?embed=1&frame=1',
    alt: '新手引导 · Watch Liquidation Risk',
    caption: '强平',
    embed: true,
    frame: true,
  },
}
