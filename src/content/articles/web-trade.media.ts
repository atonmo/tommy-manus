/** Media registry for web-trade — edit paths/captions here; MD only uses [[img:id]] / [[embed:id]]. */
export type ArticleMediaItem = {
  src: string
  alt: string
  caption?: string
  lead?: string
  embed?: boolean
  tall?: boolean
  flush?: boolean
  /** Keep iframe aspect locked to the design frame (no fixed tall height). */
  frame?: boolean
}

export const webTradeMedia: Record<string, ArticleMediaItem> = {
  'user-research': {
    src: '/articles/web-trade/02-user-research.png',
    alt: 'Web合约用户画像',
    caption: 'Research · Persona · Scenario · Advantage',
  },
  competitor: {
    src: '/articles/web-trade/03-competitor.png',
    alt: '竞品屏效对比',
    caption: 'Benchmark · Screen Efficiency',
  },
  'layout-demo': {
    src: '/articles/web-trade/04-layout-demo.png',
    alt: '布局框架演示',
    caption: 'Layout · Framework Demo',
  },
  mkhf: {
    src: '/articles/web-trade/mkhf.png',
    alt: '梳理各模块之间关系，重新规划布局结构',
    caption: 'Structure · Before → After',
  },
  'layout-responsive': {
    src: '/articles/web-trade/05-layout-responsive.html?embed=1',
    alt: '内容自适应不同尺寸屏幕',
    caption: 'Responsive · Adaptive Layout',
    embed: true,
  },
  'module-types': {
    src: '/articles/web-trade/06-module-types.png',
    alt: '信息驱动与效率驱动',
    caption: 'Modules · Info vs Efficiency',
  },
  kpmksy: {
    src: '/articles/web-trade/kpmksy.png',
    alt: '更宽的屏幕，更大的看盘视野',
  },
  'chart-wide': {
    src: '/articles/web-trade/07-chart-wide.html?embed=1&tall=1&flush=1',
    alt: '更宽的屏幕，更完整的盘面',
    embed: true,
    tall: true,
    flush: true,
  },
  kline: {
    src: '/articles/web-trade/kline.png',
    alt: '顶部信息结构与图表区',
    caption: 'Chart · Structure Zones',
  },
  kline2: {
    src: '/articles/web-trade/kline2.png',
    alt: 'K 线图表分割',
    caption: 'Split · Multi Layout Modes',
  },
  mkhfxj: {
    src: '/articles/web-trade/mkhfxj.png',
    alt: '布局模板灵活化配置',
    caption: 'Config · Flexible Layout Templates',
  },
  orderbook: {
    src: '/articles/web-trade/10-orderbook.png',
    alt: '盘口与成交服务决策，而不是堆信息',
    caption: 'Orderbook · Readable Depth',
  },
  'pro-mode': {
    src: '/articles/web-trade/11-pro-mode.svg',
    alt: '专业模式盘口展示',
    caption: 'Pro Mode · Dense Book',
  },
  'risk-layout': {
    src: '/articles/web-trade/12-risk-layout.png',
    alt: '基于分栏框架的风险信息前置',
    caption: 'Risk · Forward Placement',
  },
  'risk-layout2': {
    src: '/articles/web-trade/12-risk-layout2.png',
    alt: '基于分栏框架的风险信息前置',
    caption: 'Risk · Forward Placement',
  },
  'risk-components': {
    src: '/articles/web-trade/13-risk-components.svg',
    alt: '风控组件批量化搭建',
    caption: 'Risk · Component Kit',
  },
  'dual-zone': {
    src: '/articles/web-trade/14-dual-zone.png',
    alt: '双区结构提升开仓到管仓的效率',
    caption: 'Layout · Dual Zone',
  },
  'order-panel': {
    src: '/articles/web-trade/15-order-panel.svg',
    alt: '一列看盘，一列下单',
    caption: 'Order · Side Panel',
  },
  '15-order-panel': {
    src: '/articles/web-trade/15-order-panel.png',
    alt: '一列看盘，一列下单',
    caption: 'Order · Side Panel',
  },
  'order-scroll': {
    src: '/articles/web-trade/15-order-scroll.html?embed=1&frame=1',
    alt: '复杂委托表单过长时，开仓按钮置底，表单区上下滚动',
    caption: 'Order · Sticky Actions · Scroll Form',
    embed: true,
    frame: true,
  },
  positions: {
    src: '/articles/web-trade/16-positions.svg',
    alt: '管仓像管表格，快速转化',
    caption: 'Positions · Table Actions',
  },
  tpsl: {
    src: '/articles/web-trade/17-tpsl.svg',
    alt: '风控成为交易动作的一部分',
    caption: 'TP/SL · In-flow Controls',
  },
  'split-compare': {
    src: '/articles/web-trade/18-split-compare.png',
    alt: '分屏模式快速对照相关市场',
    caption: 'Split · Market Compare',
  },
  multitask: {
    src: '/articles/web-trade/19-multitask.svg',
    alt: '使用分屏进行多线程任务操作',
    caption: 'Split · Multitask',
  },
  'coin-switch': {
    src: '/articles/web-trade/coin-list-switch.html?embed=1&frame=1',
    alt: '点击左侧币种，右侧 K 线跟随切换',
    caption: 'List · Click to Switch Chart',
    embed: true,
    frame: true,
  },
  'visual-1': {
    src: '/articles/web-trade/20-visual-1.svg',
    alt: '视觉语言与字号色阶',
    caption: 'Visual · Type & Color',
  },
  'theme-switch': {
    src: '/articles/web-trade/theme-switch.html?embed=1&frame=1',
    alt: '深色与浅色模式切换，各停留 3 秒',
    caption: 'Theme · Dark ↔ Light',
    embed: true,
    frame: true,
  },
  'visual-2': {
    src: '/articles/web-trade/21-visual-2.svg',
    alt: '通用交易组件规范',
    caption: 'Visual · Components',
  },
}
