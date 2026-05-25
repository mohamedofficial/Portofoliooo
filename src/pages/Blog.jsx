import { useState, useMemo } from 'react'
import postsData from '../data/posts'
import MarkdownViewer from '../components/MarkdownViewer'
import { renderMarkdown } from '../utils/markdownUtils'
import loadPosts from '../utils/postsLoader'
import './Blog.css'

const SIDEBAR_CATEGORIES = [
  'HTB',
  'THM',
  'Android',
  'Reversing',
  'Pwn',
  'PwC College'
]

function Blog() {
  const [selectedPostId, setSelectedPostId] = useState(postsData[0]?.id || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const posts = useMemo(() => {
    try {
      const loaded = loadPosts()
      if (loaded && loaded.length > 0) return loaded
    } catch (err) {
      // loader might fail in non-Vite environments; fall through to static data
      console.warn('postsLoader failed, falling back to static posts', err)
    }
    return postsData.map(p => ({ ...p, html: p.html || renderMarkdown(p.raw || '') }))
  }, [])

  const filtered = posts.filter(p => {
    const matchesSearch = searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const selectedPost = posts.find(p => p.id === selectedPostId) || filtered[0] || null

  return (
    <div className="blog">
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>Static posts — I'll upload content from Obsidian notes</p>
      </section>

      <section className="blog-content">
        <div className="blog-search">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="blog-layout">
          <aside className="blog-file-list">
            <h3>Categories</h3>
            <ul className="file-list">
              <li
                key="all"
                className={`file-item ${!activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >
                <span className="file-name">All</span>
              </li>
              {SIDEBAR_CATEGORIES.map(cat => (
                <li
                  key={cat}
                  className={`file-item ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span className="file-name">{cat}</span>
                </li>
              ))}
            </ul>

            <h3 style={{ marginTop: '1.5rem' }}>Posts ({filtered.length})</h3>
            <ul className="file-list">
              {filtered.map(post => (
                <li
                  key={post.id}
                  className={`file-item ${selectedPost?.id === post.id ? 'active' : ''}`}
                  onClick={() => setSelectedPostId(post.id)}
                >
                  <span className="file-name">{post.title}</span>
                  <span className="file-title">{post.excerpt}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="blog-viewer">
            {selectedPost ? (
              <>
                <div className="viewer-header">
                  <h3>{selectedPost.title}</h3>
                  <div style={{ color: 'rgba(255,255,255,0.7)' }}>{selectedPost.date} • {selectedPost.category}</div>
                </div>
                <MarkdownViewer file={{ raw: selectedPost.raw, html: selectedPost.html, frontmatter: {} }} />
              </>
            ) : (
              <div className="no-file-selected">
                <p>No posts found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog

