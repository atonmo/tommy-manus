# Tommy-manus

基于原站 [Tommy](../Tommy) 内容与路由结构的独立视觉重构版，风格参考 [Manus login-success](https://manus.im/login-success) 的深色、系统字体、白底 CTA 与柔和边框。

## 与原站关系

- **原站 `/Users/tommy/Tommy`**：保留不动，继续作为 javaon.me 风格站点。
- **本项目 `/Users/tommy/Tommy-manus`**：复制数据与页面结构，用 Manus 深色视觉重写 UI。

## 开发

```bash
npm install
npm run dev
```

## 路由

| 路径 | 页面 |
|------|------|
| `/` | Home |
| `/work` | Work |
| `/myself` | About |
| `/chat` | Chat |
| `/article/:slug` | Article（Markdown 驱动的案例页） |

## Case 编号规则

- `src/data/works.ts` 的 `id` 是唯一编号源。
- Work 列表卡片显示 `CASE {id}`（两位补零）。
- 旗舰案例页 kicker 通过 `formatCaseKicker(slug, label)` 读取同一 `id`，避免与列表错位。

## 如何新增 / 编辑案例

1. 在 `src/data/works.ts` 增加 `WorkItem`（含 `id` / `slug` / `accent`）。
2. 新增或编辑 `src/content/articles/{slug}.md`（frontmatter + 正文；**案例正文只改 MD**）。
3. 在 `src/lib/articles.ts` 的 `articleSources` 注册该 md。
4. 可选：`src/styles/case-{slug}.css` 覆盖 `--gf-acc` 与专属区块，并在 MD frontmatter 写 `style: {slug}`。
5. 资源放入 `public/articles/{slug}/`。

保存 MD 后，开发服务器会热更新；预览路径为 `/article/{slug}`。

### MD 约定摘要

- Frontmatter：`kicker` / `dek` / `hero` / `heroTitle` / `metrics` / `style` 等。
  - `heroTitle: 永续合约|轻量版` → 行内强调；`heroTitle: 衍生品交易的||「黄金流程」` → 换行后强调。
- `## Label · Title` 为章节；以数字开头的 label（如 `01.A`）走步骤样式。
- 紧跟 h2 的 `>` 为章节 lead。
- `### id · 标题` + 一段落 → 目标卡片；`#### 标题` + 一段落 → 子卡片。
- `![alt](/path.png "caption")` → 媒体；`![title](embed:/path.html?embed=1&tall=1&flush=1)` → iframe。
- `## Design Reflection · …` + `### 01 · …` → 文末复盘区。

## 资源目录约定

| 路径 | 用途 |
|------|------|
| `public/articles/{slug}/` | 案例正式资源（唯一入口） |
| `public/work-*.{png,jpg,svg}` | Work 封面（数据字段，可后续接封面卡） |
| `public/_archive/` | 迁移遗留、未引用原型（不进页面） |
| `src/styles/case-base.css` | 全案例共用 `gf-*` 基础样式 |
| `src/styles/case-*.css` | 各案例覆盖层 |
| `src/components/case/` | Case 共用原语（含 `MarkdownCase`） |

## 架构摘要

- 案例正文：`src/content/articles/*.md` → `MarkdownCase` 渲染为现有 `gf-*` 视觉。
- 路由：`Article.tsx` 查 `getArticleBySlug`，无 Case 组件表。
