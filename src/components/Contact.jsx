import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }
    );

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 15000);

  } catch (error) {
  console.error('EmailJS Error:', error);
  console.error('Status:', error.status);
  console.error('Text:', error.text);

  alert(`EmailJS Error: ${error.text || 'Unknown error'}`);
}
  finally {
    setIsSubmitting(false);
  }
};
  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">

        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>

          <p className="contact-subtitle">
            I'm always open to discussing opportunities, collaborations,
            or simply connecting with fellow developers.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="contact-row">

            <div className="input-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Shivani"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="shivanimouryaa2@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="input-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Lets talk!! just drop me a msg here"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitted && (
            <p className="contact-success-msg">
              ✓ Message sent successfully! I'll connect to you soon.
            </p>
          )}

        </form>

      </div>
    </section>
  );
};

export default Contact;