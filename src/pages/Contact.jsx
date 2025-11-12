import './Contact.css'

function Contact() {
  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Contact</h1>
        <p>Get in touch with me</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <h2>Email</h2>
            <a href="mailto:contact@0xmvmd.com">contact@0xmvmd.com</a>
          </div>
          <div className="contact-item">
            <h2>GitHub</h2>
            <a href="https://github.com/0xmvmd" target="_blank" rel="noopener noreferrer">
              github.com/0xmvmd
            </a>
          </div>
          <div className="contact-item">
            <h2>Twitter</h2>
            <a href="https://twitter.com/0xmvmd" target="_blank" rel="noopener noreferrer">
              @0xmvmd
            </a>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send a Message</h2>
          <form 
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Form submission is not configured. Please contact via email or social media links.')
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact

