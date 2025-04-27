import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import "../ProjectsList.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null); // Track project to be deleted

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5001/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(selectedProject?._id === project._id ? null : project);
    setEditMode(false);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setEditMode(true);
  };

  const handleDelete = async () => {
    if (projectToDelete) {
      try {
        await axios.delete(`http://localhost:5001/projects/${projectToDelete}`);
        setProjects(projects.filter((p) => p._id !== projectToDelete));
        if (selectedProject && selectedProject._id === projectToDelete) {
          setSelectedProject(null);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
      setShowPopup(false); // Hide popup after deletion
      setProjectToDelete(null); // Clear selected project for deletion
    }
  };

  const confirmDelete = (projectId) => {
    setProjectToDelete(projectId); // Set project for deletion
    setShowPopup(true); // Show the popup
  };

  const cancelDelete = () => {
    setShowPopup(false); // Close popup if canceled
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">Project Lists</h2>
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <React.Fragment key={project._id}>
                <tr
                  className={`project-row ${
                    selectedProject?._id === project._id ? "selected" : ""
                  }`}
                >
                  <td>{index + 1}</td>
                  <td
                    className="clickable"
                    onClick={() => handleProjectSelect(project)}
                  >
                    {project.projectTitle}
                  </td>
                  <td
                    className="clickable"
                    onClick={() => handleProjectSelect(project)}
                  >
                    {project.projectSubtitle}
                  </td>
                  <td
                    className="clickable"
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="description-cell">
                      {project.projectDescription}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(project._id); // Set project for deletion and show popup
                        }}
                        className="delete-button"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {selectedProject &&
                  selectedProject._id === project._id &&
                  !editMode && (
                    <tr className="details-row">
                      <td colSpan="5">
                        <div className="project-details">
                          <div className="details-content">
                            <h3 className="detail-title">
                              <strong>Project Name: </strong>
                              {selectedProject.projectTitle}
                            </h3>
                            <p className="project-description">
                              <strong>Description: </strong>
                              {selectedProject.projectDescription}
                            </p>
                            {selectedProject.projectBannerimage && (
                              <div className="image-container">
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectBannerimage}`}
                                  alt={selectedProject.projectTitle}
                                  className="project-image"
                                />
                              </div>
                            )}
                            <p className="project-category">
                              <strong>Services: </strong>
                              {selectedProject.projectServices}
                            </p>
                            <p className="project-category">
                              <strong>Industries: </strong>
                              {selectedProject.projectIndustries}
                            </p>
                            <p className="project-category">
                              <strong>Category: </strong>
                              {selectedProject.projectCategory}
                            </p>

                            <p className="project-published-year">
                              <strong>Published Year:</strong>{" "}
                              {selectedProject.projectPublishedYear}
                            </p>
                            {selectedProject.projectWebsiteLink && (
                              <p className="project-website-link">
                                <strong>Website: </strong>
                                <a
                                  href={selectedProject.projectWebsiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {selectedProject.projectWebsiteLink}
                                </a>
                              </p>
                            )}

                            {selectedProject.projectSubBannerimage && (
                              <div className="project-image">
                                <strong>Sub Banner Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectSubBannerimage}`}
                                  alt="Sub Banner"
                                  className="project-image"
                                />
                              </div>
                            )}
                            {selectedProject.projectGalleryimage && (
                              <div className="project-image">
                                <strong>Gallery Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectGalleryimage}`}
                                  alt="Gallery"
                                  className="project-image"
                                />
                              </div>
                            )}
                            {selectedProject.projectShortTitle && (
                              <div className="project-short-title">
                                <strong>Short Title: </strong>
                                {selectedProject.projectShortTitle}
                              </div>
                            )}
                            {selectedProject.projectShortDescription && (
                              <div className="project-short-description">
                                <strong>Short Description: </strong>
                                {selectedProject.projectShortDescription}
                              </div>
                            )}
                            {selectedProject.projectPrimaryTitle && (
                              <div className="project-primary-title">
                                <strong>Primary Title: </strong>
                                {selectedProject.projectPrimaryTitle}
                              </div>
                            )}
                            {selectedProject.projectPrimaryDescription && (
                              <div className="project-primary-description">
                                <strong>Primary Description: </strong>
                                {selectedProject.projectPrimaryDescription}
                              </div>
                            )}
                            {selectedProject.projectSecondaryTitle && (
                              <div className="project-secondary-title">
                                <strong>Secondary Title: </strong>
                                {selectedProject.projectSecondaryTitle}
                              </div>
                            )}
                            {selectedProject.projectSecondaryDescription && (
                              <div className="project-secondary-description">
                                <strong>Secondary Description: </strong>
                                {selectedProject.projectSecondaryDescription}
                              </div>
                            )}
                            {selectedProject.projectSubSecondaryTitle && (
                              <div className="project-sub-secondary-title">
                                <strong>Sub Secondary Title: </strong>
                                {selectedProject.projectSubSecondaryTitle}
                              </div>
                            )}
                            {selectedProject.projectSubSecondaryDescription && (
                              <div className="project-sub-secondary-description">
                                <strong>Sub Secondary Description: </strong>
                                {selectedProject.projectSubSecondaryDescription}
                              </div>
                            )}
                            {selectedProject.projectBrandingimage && (
                              <div className="project-branding-image">
                                <strong>Branding Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectBrandingimage}`}
                                  alt="Branding"
                                  className="project-image"
                                />
                              </div>
                            )}
                            {selectedProject.projectProductTitle && (
                              <div className="project-product-title">
                                <strong>Product Title: </strong>
                                {selectedProject.projectProductTitle}
                              </div>
                            )}
                            {selectedProject.projectProductDescription && (
                              <div className="project-product-description">
                                <strong>Product Description: </strong>
                                {selectedProject.projectProductDescription}
                              </div>
                            )}
                            {selectedProject.projectProductimage && (
                              <div className="project-product-image">
                                <strong>Product Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectProductimage}`}
                                  alt="Product"
                                  className="project-image"
                                />
                              </div>
                            )}
                            {selectedProject.projectSubProductimage && (
                              <div className="project-sub-product-image">
                                <strong>Sub Product Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectSubProductimage}`}
                                  alt="Sub Product"
                                  className="project-image"
                                />
                              </div>
                            )}
                            {selectedProject.projectLastimage && (
                              <div className="project-last-image">
                                <strong>Last Image: </strong>
                                <img
                                  src={`http://localhost:5001/uploads/${selectedProject.projectLastimage}`}
                                  alt="Last"
                                  className="project-image"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Delete Confirmation</h2>
            <p>Are you sure you want to delete this project?</p>
            <button className="confirm" onClick={handleDelete}>
              Yes
            </button>
            <button className="cancel" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
