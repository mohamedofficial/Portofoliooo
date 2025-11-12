import './Projects.css'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Security Tool 1',
      description: 'A powerful security analysis tool built with Python and React.',
      tags: ['Python', 'React', 'Security'],
      repo: 'https://github.com/0xmvmd/project1',
      image: null
    },
    {
      id: 2,
      title: 'Web App Project',
      description: 'Full-stack web application with modern UI/UX design.',
      tags: ['React', 'Node.js', 'MongoDB'],
      repo: 'https://github.com/0xmvmd/project2',
      image: null
    },
    {
      id: 3,
      title: 'CLI Tool',
      description: 'Command-line interface tool for developers.',
      tags: ['Python', 'CLI', 'Tools'],
      repo: 'https://github.com/0xmvmd/project3',
      image: null
    },
    {
      id: 4,
      title: 'Mobile App',
      description: 'Cross-platform mobile application with React Native.',
      tags: ['React Native', 'Mobile', 'JavaScript'],
      repo: 'https://github.com/0xmvmd/project4',
      image: null
    }
  ]

  return (
    <div className="projects">
      <section className="projects-hero">
        <h1>Projects</h1>
        <p>A collection of my work and contributions</p>
      </section>

      <section className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            {project.image && (
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
            )}
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Repository →
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Projects

