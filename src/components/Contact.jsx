function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <p className="section-label">06 — CONTACT</p>

      <h2>Let's build something.</h2>

      <form className="contact-form">
        <input
          type="text"
          placeholder="Your name"
          required
        />

        <input
          type="email"
          placeholder="you@example.com"
          required
        />

        <textarea
          placeholder="Tell me about your project..."
          rows="6"
          required
        />

        <button type="submit" className="btn btn-primary">
          Send Message →
        </button>
      </form>
    </section>
  );
}

export default Contact;