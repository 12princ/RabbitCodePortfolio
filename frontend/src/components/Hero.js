import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "./Hero.css";
import MetricsContainer from "./MetricsContainer"; // Import MetricsContainer

const Hero = () => {
  const metrics = [
    { value: 280, label: "Stores Optimized", suffix: "+" },
    {
      value: 87,
      label: "Increased In Sales For Clients",
      prefix: "$",
      suffix: "m",
    },
    { value: 7, label: "Years Of Experience", suffix: "+" },
    { value: 15, label: "Expert Vetted Devs (Top 3%)", suffix: "+" },
  ];

  // Animation variants for staggered effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: -50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  };

  return (
    <>
      <Helmet>
        <title>RabbitCode</title>
        <meta
          name="description"
          content="Transform your business with high-converting Shopify stores. RabbitCode is a trusted partner for startups and enterprises, delivering exceptional e-commerce solutions."
        />
        <meta
          name="keywords"
          content="Shopify development, e-commerce, web development, online stores, high-converting stores"
        />
        {/* Open Graph / Social Media Meta Tags */}
        <meta
          property="og:title"
          content="RabbitCode - Expert Shopify Development"
        />
        <meta
          property="og:description"
          content="Transform your business with high-converting Shopify stores. Trusted by startups and enterprises alike."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rabbitcode.agency" />
        <meta property="og:image" content="/path-to-your-image.jpg" />{" "}
        {/* Add OG image */}
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RabbitCode - Expert Shopify Development"
        />
        <meta
          name="twitter:description"
          content="Transform your business with high-converting Shopify stores. Trusted by startups and enterprises alike."
        />
        <meta name="twitter:image" content="/path-to-your-image.jpg" />{" "}
        {/* Add Twitter image */}
        {/* Additional SEO Meta Tags */}
        <link rel="canonical" href="https://rabbitcode.agency" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <motion.section
        id="HeroSection"
        className="hero"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div className="hero-content" variants={container}>
          <motion.h1 className="hero-title" variants={item}>
            Welcome to <br />
            RabbitCode
          </motion.h1>

          <motion.p className="hero-subtitle" variants={item}>
            
              Take your business to the next level with high-converting Shopify
              stores! We're a trusted <strong>Shopify Partner</strong> and
              support high-growth startups as well as large public enterprises.
            
          </motion.p>

          {/* Conditional rendering of metrics */}
        </motion.div>
        {Array.isArray(metrics) && <MetricsContainer metrics={metrics} />}
      </motion.section>
    </>
  );
};

export default Hero;
