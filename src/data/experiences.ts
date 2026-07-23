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
    position: '产品体验设计师',
    company: 'Web3 某头部衍生品交易平台',
    description:
      '负责合约、现货、跟单等交易线业务的体验设计，提升用户体验与转化效率；负责 UI 小组日常管理、团队建设与分享培训；作为专家成员参与并落地 AI 精灵、猎豹体验专项、TradFi、UI 改版等公司级设计项目。',
  },
  {
    start: '2019',
    end: '2022',
    position: '设计组组长',
    company: '腾讯会议',
    description:
      '从 0 到 N 打造协同会议产品「腾讯会议」，全面负责会前预定、会中能力、会后沉淀、在线大会、直播、会议号等核心业务体验；构建移动端 / PC / 触控大屏全端闭环的数字化会议体验框架；带领团队支撑海外 VooV Meeting、企业版、私有化、腾讯会议 Rooms、腾讯日历等全产品矩阵。',
  },
  {
    start: '2017',
    end: '2021',
    position: '设计组组长',
    company: '腾讯云政务 / 健康码 / 国务院客户端等',
    description:
      '主导天府健康通、北京通、国务院客户端、云南扶助平台、光山号等产品设计；负责从角色定义、典型场景到架构、页面布局与体验创新的全链路规划与执行；兼任设计资产协同工具 Dithub 产品经理；围绕适老化设计、会议产品设计方法等课题做知识沉淀与外部课程分享，并多次派驻一线指导合作伙伴。',
  },
  {
    start: '2016',
    end: '2022',
    position: '设计委员',
    company: '腾讯 CSIG 技术委员会 · 标准制定',
    description:
      '参与云行业项目设计质量与交付验收标准制定，组织并参与一线供应商设计交付验收；负责智慧城市产业生态圈、国家适老化等多项设计标准相关工作。',
  },
  {
    start: '2014',
    end: '2016',
    position: '高级交互设计师',
    company: '腾讯电脑管家',
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
