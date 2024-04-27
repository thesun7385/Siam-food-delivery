import React from "react";

export default function Contact() {
  return (
    <>
      <section className="contact section bd-container" id="contact">
        <div className="contact-container bd-grid">
          <div className="contact-data">
            <h2 className="section-title contact-initial">Contact us</h2>
            <p className="contact-description">
              To secure your spot at our restaurant, simply reach out to us, and
              our dedicated team will promptly assist you through our
              round-the-clock chat service. We're here to make your dining
              experience exceptional.
            </p>
            <div className="contact-button">
              <a href="#" className="btn-contact">
                Contact us now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
