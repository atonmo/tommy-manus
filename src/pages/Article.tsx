import { Navigate, useParams } from 'react-router-dom'
import { getArticleBySlug } from '../lib/articles'
import { MarkdownCase } from '../components/case'

export function Article() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) {
    return <Navigate to="/work" replace />
  }

  return <MarkdownCase article={article} />
}
