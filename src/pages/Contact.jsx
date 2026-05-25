import './Contact.css'

function Contact() {
  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Contact</h1>
        <p>Reach me via email</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <h2>Email</h2>
            <a href="mailto:contact@0xmvmd.com">contact@0xmvmd.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

