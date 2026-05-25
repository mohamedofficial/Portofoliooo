import { Link } from 'react-router-dom'
import { useState } from 'react'
import Terminal from '../components/Terminal'
import postsData from '../data/posts'
import loadPosts from '../utils/postsLoader'
import './Home.css'

function Home() {
  const [search, setSearch] = useState('')

  let allPosts = postsData
  try {
    const loaded = loadPosts()
    if (loaded && loaded.length > 0) allPosts = loaded
  } catch (err) {
    // ignore and use static posts
  }

  const filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="greeting">Yo, </span>
            I'm 0xAnan.
          </h1>
          <p className="hero-subtitle">I basically get paid to be the person your sysadmin warned you about.</p>
          <p className="hero-description">
            I spend my days hunting bugs, capturing flags, and convincing computers to do things they definitely weren't designed to do. I break into systems for a living, but don't worry, I always lock the door on my way out (legally, of course).
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              View Blog
            </Link>
          </div>
        </div>
        <div className="hero-terminal">
          <Terminal />
        </div>
      </section>

      <section className="latest-projects">
        <h2>Latest Posts</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%', maxWidth: 520 }}
          />
        </div>

        <div className="project-grid">
          {filtered.slice(0, 6).map(post => (
            <div key={post.id} className="project-card">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to="/blog" className="project-link">Read →</Link>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>No posts match your search.</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

