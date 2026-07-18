import { getWorkBySlug } from '../../data/works'

/** Build "Case 08 · Label" from works.id so Work grid and case pages stay aligned. */
export function formatCaseKicker(slug: string, label: string) {
  const work = getWorkBySlug(slug)
  const no = String(work?.id ?? '?').padStart(2, '0')
  return `Case ${no} · ${label}`
}

export function formatCaseMeta(
  slug: string,
  _extras: { platform?: string; focus?: string } = {},
) {
  const work = getWorkBySlug(slug)
  if (!work) return []
  return [`Role · ${work.role}`]
}
