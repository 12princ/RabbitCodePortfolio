import React, { useState, useEffect } from "react";
import "./About.css"; // Keeps your existing styling
import { motion } from "framer-motion";
import RaviSir from "../Image/RaviSir.png";
import MayurSir from "../Image/MayurSir.png";
import Footer from "./Footer";
import Contact from "./Contact";
import Header from "./Header";
import MetricsContainer from "./MetricsContainer"; // Import MetricsContainer

export default function PrincipalsSection() {
  const teamMembers = [
    {
      name: "Mayur",
      role: "CTO & Co-founder",
      image: MayurSir,
    },
    {
      name: "Ravi Viradiya",
      role: "Co-founder and Creative Director",
      image: RaviSir,
    },
  ];

  const metrics = [
    { value: 280, label: "Stores Optimized", prefix: "+" },
    { value: 87, label: "Increased In Sales For Clients", prefix: "$", suffix: "m" },
    { value: 7, label: "Years Of Experience", prefix: "+" },
    { value: 15, label: "Expert Vetted Devs (Top 3%)", prefix: "+" },
];

  return (
    <motion.section
      id="HeroSection"
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Header />

        <section className="principals-section">
          <h2 className="section-title">Our Principals</h2>
          <h3 className="section-subtitle">
            Here are the four rules we stick to to safeguard you in these moving
            conditions:
          </h3>
          <div className="content-grid">
            <div className="content-block">
              <h4 className="block-title">We have areas of strength for</h4>
              <p className="block-text">
                Our philosophy emphasizes blurring boundaries between work and
                play, driven by curiosity and creativity. We push beyond our
                comfort zones, embracing the unknown and unlocking endless
                possibilities for true innovation.
              </p>
            </div>
            <div className="content-block">
              <h4 className="block-title">We appreciate Learning.</h4>
              <p className="block-text">
                Learning is our passion, and we continuously refine our skills
                in design, development, and copywriting. We embrace new
                platforms and features, believing that lifelong learners are the
                epitome of greatness. Join us on this journey of constant growth
                and innovation.
              </p>
            </div>
          </div>

          <div className="content-grid">
            <div className="content-block">
              <h4 className="block-title">We have areas of strength for</h4>
              <p className="block-text">
                Our philosophy emphasizes blurring boundaries between work and
                play, driven by curiosity and creativity. We push beyond our
                comfort zones, embracing the unknown and unlocking endless
                possibilities for true innovation.
              </p>
            </div>
            <div className="content-block">
              <h4 className="block-title">We appreciate Learning.</h4>
              <p className="block-text">
                Learning is our passion, and we continuously refine our skills
                in design, development, and copywriting. We embrace new
                platforms and features, believing that lifelong learners are the
                epitome of greatness. Join us on this journey of constant growth
                and innovation.
              </p>
            </div>
          </div>
          
          <MetricsContainer metrics={metrics} />
          <section className="mastermind">
            <div className="mastermind-container">
              <h2 className="mastermind-subtitle">The Mastermind</h2>
              <h1 className="mastermind-title">
                Meet multi-talented people who are
                <br />
                passionate about their craft.
              </h1>
              <div className="team-members">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`team-member member-${index + 1}`}
                  >
                    <div className="member-image-container">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="member-image"
                      />
                      <a
                        href="#"
                        className="linkedin-icon"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="our-story">
                <h2>Our Story</h2>
                <div className="story-content">
                  <p className="lead">
                    Our story is one of passion, dedication, and unwavering
                    commitment.
                  </p>
                  <p>
                    It all began with a vision to make a difference. Through our
                    relentless pursuit of excellence and a customer-centric
                    approach, we've evolved into a trusted partner. Join us on
                    this journey as we continue to create meaningful experiences
                    and surpass expectations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <Contact />
        <Footer />
      </div>
    </motion.section>
  );
}
