import type { ArticleMediaItem } from './web-trade.media'

/**
 * Tencent Meeting media registry.
 * Edit paths / captions here. In markdown prefer [[img:id]].
 * Even if MD collapses to plain alt text, the renderer can recover via alt match.
 */
export const tencentMeetingMedia: Record<string, ArticleMediaItem> = {
  milestones: {
    src: '/articles/tencent-meeting/02-milestones.png',
    alt: '关键里程碑：诞生 → 成长 → 成熟',
    caption: 'Key Milestones · Birth · Growth · Maturity',
  },
  discover: {
    src: '/articles/tencent-meeting/03-discover.png',
    alt: '精准探索：洞察与定义体验目标与策略',
    caption: 'Discover · Insight · Define',
  },
  users: {
    src: '/articles/tencent-meeting/04-users.png',
    alt: '核心用户分层：参与度 × 职业画像',
    caption: 'Segmentation · Engagement × Occupation',
  },
  ia: {
    src: '/articles/tencent-meeting/05-ia.png',
    alt: '探索设计可能性：分区、层级与功能组织',
    caption: 'IA · Zones · Hierarchy · Grouping',
  },
  'core-ux': {
    src: '/articles/tencent-meeting/06-core-ux.png',
    alt: '会中体验六项关键决策',
    caption: 'Core UX · Six Decision Points',
  },
  data: {
    src: '/articles/tencent-meeting/07-data.png',
    alt: '数据驱动的模块打磨与 A/B 机制',
    caption: 'Lean Design · A/B · Event Monitoring',
  },
  'rooms-bridge': {
    src: '/articles/tencent-meeting/08-rooms-bridge.png',
    alt: '围绕在线会议场景，连接线下多会议室',
    caption: 'Bridge · Online Meeting × Offline Rooms',
  },
  'rooms-challenge': {
    src: '/articles/tencent-meeting/09-rooms-challenge.png',
    alt: '腾讯会议 Rooms：触控大屏体验难点',
    caption: 'Challenge · Shared Device × Soft-Hard Integration',
  },
  scenarios: {
    src: '/articles/tencent-meeting/10-scenarios.png',
    alt: 'Rooms 四类典型场景',
    caption: 'Scenarios · Public · Touch · Local · Online',
  },
  goals: {
    src: '/articles/tencent-meeting/11-goals.png',
    alt: '从场景到目标再到策略',
    caption: 'Derive · Scenario → Goal → Strategy',
  },
  'cognitive-ia': {
    src: '/articles/tencent-meeting/12-cognitive-ia.png',
    alt: '认知模型驱动的 Rooms 信息架构',
    caption: 'Cognitive Model → Information Architecture',
  },
  'full-flow': {
    src: '/articles/tencent-meeting/13-full-flow.png',
    alt: 'Rooms 全流程模块矩阵',
    caption: 'Full Flow · Activation → Pre · In · Waiting · Tools',
  },
  toolbar: {
    src: '/articles/tencent-meeting/14-toolbar.png',
    alt: '高优功能前置，其余收折',
    caption: 'Polish · Priority Controls · Give Space Back',
  },
  invite: {
    src: '/articles/tencent-meeting/15-invite.png',
    alt: '扫码入会替代手动邮件邀请',
    caption: 'Polish · QR Invite · Cross-Device Share',
  },
  ergonomics: {
    src: '/articles/tencent-meeting/16-ergonomics.png',
    alt: '站立近距离触控下的工具栏可读性',
    caption: 'Ergonomics · Viewing Angle · Icon Contrast',
  },
}
