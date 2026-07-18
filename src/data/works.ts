export type WorkItem = {
  id: string
  slug: string
  title: string
  cover: string
  start: string
  end: string
  role: string
  description: string
  /** Matches case page brand / --gf-acc */
  accent: string
}

export const works: WorkItem[] = [
  {
    id: '1',
    slug: 'web-trade',
    title: 'Web 端交易页改版设计',
    cover: '/work-12.jpg',
    accent: '#3d7eff',
    start: '2025.11',
    end: '2026.1',
    role: '核心体验设计师',
    description:
      '主导改版全过程，从问题挖掘、改版方向到设计落地，利用大屏特性重建合约交易终端的屏效与操作效率。',
  },
  {
    id: '2',
    slug: 'perpetuals-lite',
    title: 'BingX 永续合约轻量版',
    cover: '/work-9.jpg',
    accent: '#b8f53a',
    start: '2026.06',
    end: '2026.07',
    role: '竞品分析 / 交互设计 / 视觉设计',
    description:
      '面向拉美地区小白用户，把永续合约交易压缩成可理解、可完成、可控风险的极简路径，降低首交门槛并放大使用量。',
  },
  {
    id: '3',
    slug: 'tencent-meeting',
    title: '腾讯会议：从 0 到 N',
    cover: '/work-10.png',
    accent: '#7dd3fc',
    start: '2019.01',
    end: '2022.06',
    role: '主设计师 / 团队管理',
    description:
      '从 0 到 1 定义腾讯会议跨端体验骨架，用研究方法、场景拆解与数据闭环，把产品带到国民级会议工具与腾讯云第一 SaaS。',
  },
  {
    id: '4',
    slug: 'tencent-cloud',
    title: '腾讯云设计工作',
    cover: '/work-11.jpg',
    accent: '#0052d9',
    start: '2018.01',
    end: '2022.06',
    role: '设计副总监 / 团队管理',
    description:
      '统筹政务一线、云控制台、知识平台与设计体系等多条业务线，把团队设计与方法沉淀为可规模化的交付能力。',
  },
  {
    id: '5',
    slug: 'golden-flow',
    title: '衍生品交易的「黄金流程」',
    cover: '/work-8.jpg',
    accent: '#ff8a1f',
    start: '2025.03',
    end: '2025.09',
    role: '数据分析 / 方案设计 / 产品策略',
    description: '以首交转化为目标，拆解注册、KYC、入金到下单的全链路漏斗，用数据洞察驱动体验干预，提升平台交易量。',
  },
  {
    id: '6',
    slug: 'ai-native-design',
    title: 'AI-Native Design',
    cover: '/work-7.svg',
    accent: '#5B9FFF',
    start: '2025.09',
    end: '2026.07',
    role: '设计 × 工程交叉',
    description:
      '与工程协作，把设计规范、组件与交付整理成可执行的 Skill 与工作流，让 AI 真正改进设计生产效率。',
  },
  {
    id: '7',
    slug: 'endoscope',
    title: '无线硬式内窥镜 1.0',
    cover: '/work-13.jpg',
    accent: '#8B5CF6',
    start: '2022.01',
    end: '2024.12',
    role: '产品设计师（工业设计 / 实体交互）',
    description:
      '博士期间参与 InsyMedical 无线硬式内窥镜 1.0：定义系统边界与形态语言，完成手持端与接收端设计，推动体积压缩、无线化与多场景落地。',
  },
]

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug)
}
