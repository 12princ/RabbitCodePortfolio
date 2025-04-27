import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Project.css'; // Styling file

const CATEGORIES = ["All", "E-Commerce", "UI Design", "Custom Development", "Branding"]; // Available categories

const Project = () => {
  const [projects, setProjects] = useState([]); // Stores fetched projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeCategory, setActiveCategory] = useState("All"); // Active category filter
  const [visibleProjects, setVisibleProjects] = useState(6); // Limit to 6 projects initially
  const navigate = useNavigate(); // For navigation

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects');
        console.log('API Response:', response.data); // Optional: Log API response
        setProjects(response.data); // Update state with fetched projects
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(`Failed to fetch projects. Error: ${err.message}`); // Set error message
        setLoading(false); // Set loading to false
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on the active category
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.projectCategory === activeCategory);

  // Handle redirection to the "All Projects" page
  const handleSeeMore = () => {
    navigate('/all-projects'); // Navigate to the detailed project page
  };

  if (loading) return <div>Loading projects...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <div id="projectSection" className="projects">
      <h2 className="section-headertitle">Check Out Our Projects</h2>

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
          filteredProjects.slice(0, visibleProjects).map((project) => (
            <div key={project._id} className="card1">
              <img
                className="image"
                src={`uploads/${project.projectImage}`}
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
          <div className="error">No projects found in this category.</div> // Handle empty category state
        )}
      </div>

      {/* See More Button */}
      {filteredProjects.length > visibleProjects && (
        <div className="seemore">
          <li className="tab-pills" onClick={handleSeeMore}>
            See More
          </li>
        </div>
      )}
    </div>
  );
};

export default Project;
  