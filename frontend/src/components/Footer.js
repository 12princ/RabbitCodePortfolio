// Footer.js
import React from "react";
import "./Footer.css";
import logo from "../Image/favicon1.png";
import linkdin from "../Image/linkedin.png";
import phone from "../Image/phone.png";
import footeremail from "../Image/footeremail.png";
import heart from "../Image/heart.png";
import { Link } from 'react-scroll';

const Footer = () => {
  const socialLinks = [];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footerwrapper">
          <div className="footer-content">
            <div className="footer-logo">
              <Link to="HeroSection" smooth={true} duration={500}> 
                <img src={logo} alt="Logo" />
              </Link>
              <div className="footer-contact">
                <div className="footerwrapper">
                  <h2>Let's get in touch</h2>
                  <div className="email-wrap">
                    <span>
                      <img src={footeremail} alt="Logo" />{" "}
                    </span>
                    <a href="mailto:hi@abox.agency" className="contact-email">
                      info@rabbitcode.agency
                    </a>
                  </div>

                  <div className="contact-row">
                    <div className="quick-talk">
                      <span>
                        {" "}
                        <img src={phone} alt="Logo" />
                      </span>
                      <a href="tel:+917046216489" className="phone-button">
                        +91 8347732060
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-sections">
              <div className="footer-services">
                <h4>Services</h4>
                <ul>
                  <li>E-Commerce</li>
                  <li>UI/UX Design</li>
                  <li>Web Development</li>
                  <li>Shopify Consultations</li>
                  <li>Custom Shopify Development</li>
                  <li>Store Setup & Management</li>
                  <li>Search Engine Optimization</li>
                  <li>Testing</li>
                </ul>
              </div>
              {/* <div className="footer-company">
            <h4>Company</h4>
            <ul>
              <li>Portfolio</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Services</li>
              <li>Blogs</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
            </ul>
          </div> */}

              <div className="footer-office">
                <h4>Head Office</h4>
                <p>India</p>
                <p>432, 433, Skyview Business Horizon, Surat</p>
                <p>Kamrej Hwy, opp. MD Dreamland Farm,</p>
                <p>Valak Gujarat 395006</p>
                <div class="social-icons">
                  
                  <a
                    href="https://www.linkedin.com/in/hr-rabbitcode-727791338/"
                    className="linkdin"
                  >
                    <img src={linkdin} alt="Logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              All © 2024 RabbitCode. All Rights Reserved by RabbitCode.
            </span>
            {/* 
            <div className="powerby">
              <span>Powered by RabbitCode</span>
              <Link to="HeroSection" smooth={true} duration={500}>
                <img src={logo} alt="Logo" />
              </Link>
            </div> */}
            <div className="made-with-love">
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                Made with <img src={heart} alt="Logo" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
