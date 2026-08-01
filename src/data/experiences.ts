export type Experience = {
  start: string
  end: string
  position: string
  company: string
  description: string
}

export type Education = {
  start: string
  end: string
  school: string
  major: string
  degree: string
}

export const experiences: Experience[] = [
  {
    start: '2022',
    end: 'Present',
    position: 'UI负责人',
    company: '某Web3头部交易平台',
    description:
      '负责交易与资产方向体验设计：围绕高频衍生品开平仓等核心场景，通过信息架构与交互升维交易终端；深度参与全平台核心项目的产品讨论、竞品分析与用户调研，对齐平台目标；将金融逻辑植入设计规范，主导公司级设计标准与组件体系建设，提升落地效率与质量。',
  },
  {
    start: '2018',
    end: '2022',
    position: '设计负责人',
    company: '腾讯会议',
    description:
      '从 0 到 N 打造协同会议产品「腾讯会议」，全面负责会前预定、会中能力、会后沉淀、在线大会、直播、会议号等核心业务体验；构建移动端 / PC / 触控大屏全端闭环的数字化会议设计框架；带领团队支撑海外 VooV Meeting、企业版、私有化、腾讯会议 Rooms、腾讯日历等全产品矩阵。',
  },
  {
    start: '2018',
    end: '2022',
    position: '设计负责人',
    company: '腾讯云政务 / 健康码 / 国务院客户端等',
    description:
      '主导天府健康通、北京通、国务院领事馆、云南扶助平台、光山号等移动产品设计；负责从角色定义、典型场景到架构、页面布局与体验创新的全链路规划与执行；兼任设计资产协同工具 Dithub 产品经理；围绕适老化设计、会议产品设计方法等课题做知识沉淀与外部课程分享。',
  },
  {
    start: '2018',
    end: '2022',
    position: '设计委员 / BG 学院讲师',
    company: '腾讯 CSIG 技术委员会 · 腾讯云设计通道',
    description:
      '参与云行业项目设计质量与交付验收标准制定，组织并参与一线供应商设计交付验收；参与智慧城市产业生态圈、国家级无障碍等多项设计标准相关工作；负责 BG 级设计通道培训，自研《交互设计方法》《健康码适老化改造》《腾讯会议设计历程》等课程；个人及团队专利 30 余项，获公司级创新奖、年度奖及广东省省长杯工业设计金奖等。',
  },
  {
    start: '2015',
    end: '2018',
    position: '设计经理',
    company: '易点天下',
    description:
      '负责设计团队管理与业务交付，推动设计协作效率与体验质量；沉淀多终端设计方法，支持 ToC / ToB 业务落地。',
  },
  {
    start: '2010',
    end: '2015',
    position: '高级交互设计师',
    company: '腾讯',
    description:
      '负责桌面安全软件（腾讯电脑管家）7.0 全面重构 Redesign，贯穿产品生命周期支持设计与创新；面向项目组制定并推广 UI 设计规范，提升易用性共识与设计效率；深入掌握 PC 端用户习惯与全流程体验设计方法。',
  },
]

export const educations: Education[] = [
  {
    start: '2022',
    end: 'Present',
    school: '西安交通大学',
    major: '计算机',
    degree: '博士在读',
  },
  {
    start: '2007',
    end: '2010',
    school: '西安交通大学',
    major: '工业设计',
    degree: '工学硕士',
  },
  {
    start: '2003',
    end: '2007',
    school: '四川大学',
    major: '工业设计',
    degree: '工学学士',
  },
]
