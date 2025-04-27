import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Marketing.css"; // Services CSS
import emaillogo from "../Image/Email.svg";
import Aimarketting from "../Image/AI.svg";
import social from "../Image/social-media.png";
import canva from "../Image/canva.webp";
import SEO from "../Image/SEO.png";

function Marketing() {
  // Animation variants for tool items
  const toolItemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start position: invisible and below
    visible: { opacity: 1, y: 0 }, // End position: fully visible and original position
  };

  // Reference for detecting scroll into view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger animation once when 20% of the element is in view

  return (
    <div className="app-containe">
      <section className="tools-section">
        <h2 className="section-headertitle">Marketing Tools</h2>

        <motion.div
          className="tools-grid"
          ref={ref}
          initial="hidden" // Initial state for children
          animate={isInView ? "visible" : "hidden"} // Animate based on scroll position
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }, // Stagger animation of children elements
            hidden: {},
          }}
        >
          {/* Each tool item will have its own scroll-triggered animation */}
          <motion.div
            className="tool-item"
            variants={toolItemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }} // Animation configuration
          >
            <img src={emaillogo} alt="Email Marketing" />
            <p>Email</p>
          </motion.div>

          <motion.div
            className="tool-item"
            variants={toolItemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={social} alt="Social Media Marketing" />
            <p>Social Media</p>
          </motion.div>

          <motion.div
            className="tool-item"
            variants={toolItemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={SEO} alt="SEO Marketing" />
            <p>SEO</p>
          </motion.div>

          <motion.div
            className="tool-item"
            variants={toolItemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={Aimarketting} alt="AI Marketing" />
            <p>AI</p>
          </motion.div>
          
          <motion.div
            className="tool-item"
            variants={toolItemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={canva} alt="Canva Marketing" />
            <p>Canva</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Marketing;
