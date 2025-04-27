import React, { useState, useEffect, useRef } from "react"; 
import { motion } from "framer-motion";
import "./contact.css";

function Contact() {
  const [isInView, setIsInView] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [submittedEmail, setSubmittedEmail] = useState(""); // State for the submitted email
  const [emailWarning, setEmailWarning] = useState(""); // State for email warning message
  const contactRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(event.target);
    const email = formData.get("email"); // Get email from formData

    // Check if email is already submitted
    if (submittedEmail === email) {
      setEmailWarning("You have already scheduled a call.");
      setTimeout(() => {
        setEmailWarning(""); // Clear warning after 3 seconds
      }, 10000);
      return; // Stop submission if email already submitted
    }

    formData.append("access_key", "4e1a5328-1839-42b0-a4cd-b5b2ea7a0b32");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setSuccessMessage("Thank you for reaching out! Your 30-minute FREE call request has been successfully submitted!");
      setSubmittedEmail(email); // Save submitted email
      form.reset();

      // Hide the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after 3 seconds
      }, 10000);
    } else {
      console.log("Error", res);
      setSuccessMessage("Failed to send message. Please try again.");
      form.reset();

      // Hide the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after 3 seconds
      }, 10000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animationPlayed) {
          setIsInView(true);
          setAnimationPlayed(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [animationPlayed]);

  return (
    <div id="contactSection" className="app-container" ref={contactRef}>
      <div className="row"></div>

      <section className="contact-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span>Book a 30 min FREE call & </span><br />Let's talk about how we can elevate your business!
        </motion.h2>

        <motion.form
          onSubmit={onSubmit}
          className="contact-form"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
        >
          <div className="form-group">
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name*"
              className="form-input"
              required
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <motion.input
              type="text"
              name="company"
              placeholder="Company Name"
              className="form-input"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </div>
          <div className="form-group">
            <motion.input
              type="email"
              name="email"
              placeholder="Email Address*"
              className="form-input"
              required
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              className="form-input"
              required
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </div>
          <div className="form-group">
            <motion.textarea
              name="message"
              placeholder="A Few Words*"
              className="form-textarea"
              required
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
            ></motion.textarea>
          </div>
          <motion.button
            type="submit"
            className="send-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Schedule a Call
          </motion.button>
        </motion.form>

        {/* Display Success Message */}
        {successMessage && (
          <h3 className="success-message">{successMessage}</h3>
        )}

        {/* Display Email Warning Message */}
        {emailWarning && (
          <h2 className="email-warning">{emailWarning}</h2>
        )}
      </section>
    </div>
  );
}

export default Contact;   