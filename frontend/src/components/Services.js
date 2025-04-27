import React, { useState } from "react";
import "./Services.css";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react"; // Import necessary icons

const Services = () => {
  const [activeService, setActiveService] = useState(2);
  const [hoveredService, setHoveredService] = useState(null); // State to track hover

  const services = [
    
    {
      id: 1,
      title: "Store Setup & Management",
      description:
        "The Store Setup & Management service offers comprehensive solutions, including building or redesigning stores, migrating stores, customizing themes, and providing ongoing website management.",
    },
    {
      id: 2,
      title: "Shopify Consultations",
      description:
      "Shopify Consultations are available to optimize page speeds, provide business strategy guidance, review UI/UX design, and implement A/B testing along with conversion rate optimization strategies.",
    },
    {
      id: 3,
      title: "Custom Shopify Development",
      description:
        "The Custom Shopify Development service covers a wide range of development needs, such as Shopify app development, checkout extensibility, POS setup, and the implementation of headless eCommerce solutions.",
    },
    {
      id: 4,
      title: "Web Design",
      description:
        "We create visually appealing, functional websites that blend aesthetics with usability, ensuring they're mobile-friendly and optimized for search engines.",
    },
    {
      id: 5,
      title: "UI/UX Design",
      description:
        "Our UI/UX Design service focuses on user-centric solutions, enhancing website and app usability through intuitive interfaces and seamless user experiences.",
    },
    {
      id: 6,
      title: "Search Engine Optimization",
      description:
        "For Search Engine Optimization, the team focuses on crafting detailed product descriptions, conducting website and email marketing, executing social media marketing strategies, and performing thorough website audits.",
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="title">Our Services</h2>
        <p className="sub-title">
          We bring your ideas and vision to life through a unique web project
          that captivates both you and your customers.
        </p>
        <ul className="service-list">
          {services.map((service) => (
            <motion.li
              key={service.id}
              className={`service-item ${
                service.id === activeService ? "active" : ""
              }`}
              onClick={() => setActiveService(service.id)}
              onMouseEnter={() => setHoveredService(service.id)} // Set hoveredService when hovering
              onMouseLeave={() => setHoveredService(null)} // Reset hoveredService on mouse leave
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="titlewrap"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="service-number">
                  {service.id.toString().padStart(2, "0")}
                </span>
                <span className="service-title">{service.title}</span>
              </div>
              <p className="service-description">{service.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
