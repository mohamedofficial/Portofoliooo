import './About.css'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="about-intro">
          Welcome to my digital space. I'm a Electronics & Communication Engneering student , start studing wep & Mobile pentest a bout 2 years ago.
        </p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Who Am I?</h2>
          <p>
            I'm Mohamed Metwally, also known as 0xmvmd.
             I specialize in WEP pentesting , Revers Eng, in wasted time iam creating 
          tools that make the digital world more easy & Flexable .
          </p>
        </div>

        <div className="about-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <span className="skill-name">Cybersecurity</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Web Development</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">React / JavaScript</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Python</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Security Research</span>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Interests</h2>
          <ul className="interests-list">
            <li>🔒 Reverse Engneering & Penetration Testing</li>
            <li>💻 Hardware Hacking </li>
            <li> </li>
            
          </ul>
        </div>

        <div className="about-section">
          <h2>Download CV</h2>
          <p>Want to know more? Download my resume:</p>
          <button className="btn btn-primary">Download CV</button>
        </div>
      </section>
    </div>
  )
}

export default About

