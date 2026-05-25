import { renderMarkdown, parseFrontmatter } from './markdownUtils'

// Loads all markdown files from /src/posts using Vite's glob (build-time)
// Returns an array of post objects: { id, title, date, category, excerpt, raw, html, frontmatter }
export default function loadPosts() {
  const modules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true })

  const posts = Object.entries(modules).map(([path, raw]) => {
    const filename = path.split('/').pop()
    const id = filename.replace(/\.md$/i, '')

    const { frontmatter, content } = parseFrontmatter(raw)
    const body = content || raw

    const title = frontmatter?.title || id
    const date = frontmatter?.date || ''
    const category = frontmatter?.category || ''
    const excerpt = frontmatter?.excerpt || (body.slice(0, 160).replace(/\n+/g, ' '))
    const html = renderMarkdown(body)

    return {
      id,
      title,
      date,
      category,
      excerpt,
      raw,
      html,
      frontmatter: frontmatter || {}
    }
  })

  posts.sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date) - new Date(a.date)
  })

  return posts
}
