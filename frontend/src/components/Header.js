import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Header.css";
import Logo from "../Image/favicon1.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProjectsClick = () => {
    navigate("/?scrollTo=projectSection");
  };

  const handleAboutClick = () => {
    navigate("/about"); // Redirect to the about page
  };

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div className="logos" whileHover={{ scale: 1.1 }}>
        <Link
          onClick={handleHomeClick}
          to="HeroSection"
          smooth={true}
          duration={500}
        >
          <img src={Logo} alt="Logo" />
        </Link>
      </motion.div>
      <nav className="nav">
        <motion.div
          className="nav-item"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Link
            onClick={handleHomeClick}
            to="HeroSection"
            smooth={true}
            duration={500}
            className="home"
          >
            Home
          </Link>
        </motion.div>

        {/* <motion.div
          className="nav-item"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            onClick={handleAboutClick}
            to="aboutSection"
            smooth={true}
            duration={500}
            className="about"
          >
            About
          </Link>
        </motion.div> */}

        <motion.div
          className="nav-item"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            onClick={handleProjectsClick}
            to="projectSection"
            offset={-90}
            smooth={true}
            duration={800}
            className="project"
          >
            Projects
          </Link>
        </motion.div>

        <motion.div
          className="nav-item"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Contact Us button with btn-88 */}
          <Link
            to="contactSection"
            offset={-50}
            smooth={true}
            duration={500}
            className="btn-44"
          >
           Contact Us
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
