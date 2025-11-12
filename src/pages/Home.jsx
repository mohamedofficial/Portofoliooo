import { Link } from 'react-router-dom'
import Terminal from '../components/Terminal'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="greeting">$ </span>
            white Hacker
          </h1>
          <p className="hero-subtitle">aka 0xmvmd</p>
          <p className="hero-description">
            Security researcher, developer, and digital nomad. Exploring the intersection 
            of cybersecurity, code, and creativity.
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
        <h2>Latest Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Description of project 1...</p>
            <a href="#" className="project-link">View →</a>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2...</p>
            <a href="#" className="project-link">View →</a>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Description of project 3...</p>
            <a href="#" className="project-link">View →</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

