export type ChatQA = {
  id: string
  question: string
  keywords: string[]
  answer: string[]
}

export const welcomeParagraphs = [
  '👋 你好，我是 Tommy。有 16 年产品体验设计经验——从腾讯会议从 0 到 N，到 Web3 衍生品交易产品，再到现在把 AI 写进真实设计工作流。',
  '这里是我的数字替身：你问，我就答。想聊经历、方法、作品，还是合作可能性，都可以直接说。',
]

/** @deprecated use welcomeParagraphs */
export const welcomeMessage = welcomeParagraphs.join('\n\n')


export const suggestedQuestions = [
  '先介绍一下你自己？',
  '你最具代表性的项目是什么？',
  '你怎么做体验设计？',
  '为什么值得和你聊聊？',
  '你怎么看 AI 和设计？',
  '最近在做什么？',
  '怎么联系你？',
]

export const chatKnowledge: ChatQA[] = [
  {
    id: 'about',
    question: '先介绍一下你自己？',
    keywords: [
      '介绍',
      '你是谁',
      '背景',
      '自己',
      '简介',
      '简历',
      '谁呀',
      'who',
      'about',
      '多大',
      '多少年',
      '16',
      '资深',
    ],
    answer: [
      '我是 Tommy（冯钊），产品体验设计师，从业约 16 年。',
      '路径很清楚：四川大学工业设计本科 → 西安交大工业设计硕士 → 现在交大计算机博士在读；职业上从腾讯电脑管家、政务与健康码，到腾讯会议设计负责人，再到 Web3 头部衍生品交易所负责交易线体验与 UI 小队建设。',
      '我擅长的是复杂业务：To C / B / G、金融交易、协同会议。信条很简单——设计是规划未来，用逻辑搭骨骼，用感知给产品呼吸。',
    ],
  },
  {
    id: 'signature-work',
    question: '你最具代表性的项目是什么？',
    keywords: [
      '代表作',
      '腾讯会议',
      '最成功',
      '自豪',
      '最有名',
      '会议',
      'voov',
      '0 到',
      '从0',
      '国民级',
    ],
    answer: [
      '如果只能挑一个，是腾讯会议。我作为设计负责人，从 0 到 N 把它做成国民级协同会议产品，覆盖会前、会中、会后，以及直播、在线大会、会议号等核心业务。',
      '我们搭了一套移动 / PC / 触控大屏全端闭环的体验框架，并支撑 VooV Meeting、企业版、私有化、Rooms、腾讯日历等矩阵。产品后来成为腾讯云第一 SaaS，团队也从几个人扩到近二十人。',
      '更完整的过程拆解在 Work 页「腾讯会议：从 0 到 N」里，欢迎点进去看。',
    ],
  },
  {
    id: 'method',
    question: '你怎么做体验设计？',
    keywords: [
      '方法',
      '怎么做',
      '流程',
      '工作流',
      '黄金流程',
      '漏斗',
      '数据',
      '用户中心',
      '方法论',
      'approach',
      'process',
    ],
    answer: [
      '我习惯以用户为中心，但最终对齐业务结果：从角色、场景、任务一路走到架构、流程与体验创新。',
      '近年在交易场景沉淀了「黄金流程」：先锁住转化最贵的路径，再按漏斗节点做归因与干预，让设计决策直接对应交易量 / 完成率。',
      '在复杂系统里，我更在意两件事——有没有把问题定义清楚，以及方案能不能在约束里被真的推上线。',
    ],
  },
  {
    id: 'why-me',
    question: '为什么值得和你聊聊？',
    keywords: [
      '为什么',
      '面试',
      '招聘',
      '雇佣',
      '招人',
      '机会',
      '值得',
      '优势',
      '强项',
      '能力',
      '价值',
      '合作',
    ],
    answer: [
      '因为我能把「问题—方案—落地—验证」串成闭环：不只会画界面，也会带团队、推共识、在真实约束里做可交付的决策。',
      '16 年里我覆盖过 To C / B / G 与金融交易，熟悉多终端习惯，能主导从角色场景到产品架构的全链路。',
      '同时我也在补工程与 AI：博士在读计算机，并把 AI-Native 设计工作流落到生产。想招的是能扛复杂产品、还能把设计推进业务的人，我们可以聊聊。',
    ],
  },
  {
    id: 'ai-design',
    question: '你怎么看 AI 和设计？',
    keywords: [
      'ai',
      '人工智能',
      '大模型',
      '天塌',
      '失业',
      '替代',
      'skill',
      '生成',
      'cursor',
      'llm',
      'native',
    ],
    answer: [
      '我不焦虑“设计师天塌了”。AI 会压缩重复劳动，但会放大判断力：洞察、取舍、叙事，以及把复杂系统变清晰。',
      '我更关心怎么让 AI 进入生产：把规范、组件、交付整理成可执行的 Skill 与工作流，让生成结果能进业务代码，而不是停在演示稿。',
      'AI 是放大器，质量最终还是人的审美与业务判断。Work 页有一篇「AI-Native Design」是这段实践的复盘。',
    ],
  },
  {
    id: 'recent-work',
    question: '最近在做什么？',
    keywords: [
      '最近',
      '现在',
      '在做',
      '当前',
      '项目',
      '作品',
      '交易所',
      '衍生品',
      '合约',
      '交易',
      'web3',
      'bingx',
      'work',
    ],
    answer: [
      '现在在 Web3 某头部衍生品交易所，做产品体验设计并带 UI 小队：合约、现货、跟单等交易线，以及 AI 精灵、TradFi、体验专项等公司级项目。',
      '最近对外能讲的代表案例：衍生品「黄金流程」首交漏斗，以及面向小白用户的永续合约轻量版；同时持续推进 AI-Native 设计工作流。',
      '详情都在 Work 页，案例里写了判断与过程，不只是结果截图。',
    ],
  },
  {
    id: 'career',
    question: '你的职业经历是怎样的？',
    keywords: [
      '经历',
      '工作',
      '职业',
      '腾讯',
      '电脑管家',
      '健康码',
      '政务',
      'csig',
      '履历',
      '跳槽',
      '哪里',
    ],
    answer: [
      '大致四段：腾讯电脑管家高级交互（PC 安全产品 Redesign）→ 腾讯云政务 / 健康码 / 国务院客户端等设计负责人 → 腾讯会议设计负责人 → 现在 Web3 衍生品交易所交易线体验与团队管理。',
      '其间我也在 CSIG 技术委员会参与云行业设计质量标准与适老化等标准相关工作，做过知识沉淀和外部分享。',
      '时间线更完整的版本在 About 页；如果你关心某一段，我可以单独展开。',
    ],
  },
  {
    id: 'education',
    question: '你的教育背景？',
    keywords: ['学历', '教育', '博士', '硕士', '本科', '交大', '西安', '川大', '四川大学', '学校'],
    answer: [
      '本科四川大学工业设计，硕士西安交通大学工业设计，现在西安交大计算机博士在读。',
      '工业设计训练了我的造型与系统思维，博士阶段补的是计算与工程视角——这也是我现在能更顺畅地推进 AI × 设计交叉落地的原因。',
    ],
  },
  {
    id: 'team',
    question: '你带过团队吗？',
    keywords: ['团队', '管理', '带人', '小队', '负责人', '领导', '老板', '同学'],
    answer: [
      '带过。腾讯会议时期带设计团队支撑全产品矩阵；现在在交易所负责 UI 小队管理、建设、分享培训。',
      '我理解的管理不是堆考核，而是把标准、节奏、判断对齐——让设计同学能在业务压力下稳定产出，也能把经验沉淀成可复用资产。',
    ],
  },
  {
    id: 'domains',
    question: '你擅长哪些业务？',
    keywords: ['擅长', '领域', 'toc', 'tob', 'tog', '金融', 'to c', 'to b', 'to g', '业务类型'],
    answer: [
      '覆盖面比较广：To C 交易与安全产品、To B 协同会议与 SaaS、To G 政务服务与健康码，以及金融 / 衍生品交易。',
      '共通点是复杂系统与多端习惯。我习惯先找到关键路径和真实摩擦，再决定设计资源该打在哪里。',
    ],
  },
  {
    id: 'future',
    question: '5 年后你想成为什么样的设计师？',
    keywords: ['5 年', '五年', '未来', '规划', '成为', '什么样', '目标'],
    answer: [
      '我希望自己仍是能端到端扛住复杂产品的人：定义问题、设计方案、推动落地、用数据验证——最好还能把 AI 工作流变成团队默认能力。',
      '职称不重要。重要的是：我解决什么问题，能为用户和业务创造什么长期价值。设计是规划未来，这句话我会一直当真。',
    ],
  },
  {
    id: 'contact',
    question: '怎么联系你？',
    keywords: ['联系', '邮箱', '微信', 'email', 'wechat', 'mail', '电话', '手机', '加你'],
    answer: [
      'Email：fengzhao@vip.qq.com',
      '微信：atonmo0020',
      '合作、内推，或只是想聊聊体验设计 / AI，随时打招呼。页脚 WeChat / Email 悬停也能看到。',
    ],
  },
]

const fallbackAnswers = [
  [
    '这个问题挺好，不过有点宽。你可以问得更具体一点——比如某段经历、某个作品、我怎么做设计和带团队，或怎么联系。',
    '也可以直接点下面的推荐问题，我按真实履历答你。',
  ],
  [
    '我在这儿就是当你的线上替身。经历、方法、作品、观点都行。',
    '试着问：腾讯会议、黄金流程、AI-Native，或“为什么值得聊聊”。',
  ],
]

export function matchChatReply(input: string): string[] {
  const raw = input.trim()
  const q = raw.toLowerCase()
  if (!q) return fallbackAnswers[0]

  const exact = chatKnowledge.find((item) => item.question === raw)
  if (exact) return exact.answer

  let best: ChatQA | null = null
  let bestScore = 0

  for (const item of chatKnowledge) {
    let score = 0
    for (const keyword of item.keywords) {
      if (q.includes(keyword.toLowerCase())) {
        score += keyword.length >= 4 ? 2 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  if (best && bestScore > 0) return best.answer

  if (/你好|您好|hello|hi\b|hey|早上好|晚上好|在吗/.test(q)) {
    return [
      '在的。我是 Tommy 的数字替身，16 年体验设计这一路，你想从哪聊起都行。',
      '可以问经历、代表作、方法，或直接说你关心的合作场景。',
    ]
  }

  if (/谢谢|感谢|thanks/.test(q)) {
    return ['客气啦。还有想了解的，继续问就好。']
  }

  return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)]
}

export function nextSuggestions(asked: string[]): string[] {
  const remaining = suggestedQuestions.filter((q) => !asked.includes(q))
  if (remaining.length >= 3) return remaining.slice(0, 3)
  const extras = chatKnowledge.map((item) => item.question).filter((q) => !asked.includes(q))
  return [...remaining, ...extras].slice(0, 3)
}
