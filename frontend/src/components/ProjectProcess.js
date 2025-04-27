import React from "react";
import { motion } from "framer-motion";
import "./ProjectProcess.css";
import process from "../Image/process.jpg";

const processSteps = [
  {
    number: "01",
    title: "User Requirements",
    description:
      "Gathering project requirements means identifying key users and understanding their needs, motivations, and goals to ensure a successful outcome.",
  },
  {
    number: "02",
    title: "Research and Wireframes",
    description:
      "Developing a design blueprint gives an early preview of the intended look and structure of the final design.",
  },
  {
    number: "03",
    title: "Design and Development",
    description:
      "Throughout development, we’ll leverage the latest technologies for both the front-end and back-end to build a fully functional online store that is scalable and adaptable to future growth.",
  },
  {
    number: "04",
    title: "Quality Assurance",
    description:
      "We thoroughly check for errors and make necessary corrections to ensure everything aligns with our high-quality standards.",
  },
  {
    number: "05",
    title: "Deployment and Launch",
    description:
      "Once the project has been tested and approved, it’s ready to be launched for the world to experience and use.",
  },
  {
    number: "06",
    title: "Monitoring and Optimization",
    description:
      "After the launch, we continue to monitor the project, adding new features and improving performance to ensure it works even better over time.",
  },
];

export default function ProjectProcess() {
  return (
    <div className="project-process">
      <div className="container">
        {" "}
        <div className="left-side">
          <h1>How we process through each project</h1>
          <p>
            We craft captivating online experiences that capture attention and
            foster meaningful connections. Our agency blends innovation,
            strategy, and expertise to drive your success in the digital world.
          </p>
          <img src={process} className="about-image" />
        </div>
        <div className="right-side">
          <div className="process-card">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
