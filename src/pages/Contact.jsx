import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        LET'S CONNECT
      </h2>

      <p className="section-description">
        I'm always open to learning, collaborating, and
        building exciting projects.
      </p>

      <div className="contact-grid">
        <div className="contact-item">
          <h3>Email</h3>

          <a href="mailto:tanmayeepullangari@gmail.com">
            tanmayeepullangari@gmail.com
          </a>
        </div>

        <div className="contact-item">
          <h3>GitHub</h3>

          <a
            href="https://github.com/tanmayeepullangari"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/tanmayeepullangari
          </a>
        </div>

        <div className="contact-item">
          <h3>LinkedIn</h3>

          <a
            href="https://linkedin.com/in/tanmayee-pullangari"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/tanmayee-pullangari
          </a>
        </div>

        <div className="contact-item">
          <h3>Location</h3>

          <p>Warangal, Telangana</p>
        </div>
      </div>

      <div className="contact-form-container">
        <h3>Send Me a Message</h3>

        <ContactForm />
      </div>

      <p className="contact-end">
        Thank you for visiting my portfolio!
      </p>
    </section>
  );
}

export default Contact;