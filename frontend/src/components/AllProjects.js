import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios"; // Import axios for API call

const CATEGORIES = [
  "All",
  "E-Commerce",
  "UI Design",
  "Custom Development",
  "Branding",
]; // Available categories

const AllProjects = () => {
  const [projects, setProjects] = useState([]); // State for projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeCategory, setActiveCategory] = useState("All"); // Active category filter

  const navigate = useNavigate(); // Navigation hook

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5001/projects");
        console.log("API Response:", response.data); // Optional: Log API response
        setProjects(response.data); // Update state with fetched projects
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(`Failed to fetch projects. Error: ${err.message}`); // Set error message
        setLoading(false); // Set loading to false
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on the selected category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.projectCategory === activeCategory
        );

  if (loading) return <div>Loading projects...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <div id="projectSection" className="projects">
      <Header /> {/* Header Component */}
      <div className="project-container">
      <h2 className="section-headertitle">All Projects</h2>

      {/* Category Tabs */}
      <div className="category_tabs">
        <ul className="tabs">
          {CATEGORIES.map((category) => (
            <li
              key={category}
              className={`tab-pills ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Project List */}
      <div className="section12">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project._id} className="card1">
              <img
                className="image"
                src={`http://localhost:5001/uploads/${project.projectImage}`}
                alt={project.projectTitle}
              />
              <div className="info_wrap">
                <Link to={`/project/${project._id}`} className="card-link">
                  <h3 className="title">{project.projectTitle}</h3>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="error">No projects found in this category.</div> // Handle empty state
        )}
      </div>

      <Contact /> 
      <Footer />
    </div>
    </div>
  );
};

export default AllProjects;
