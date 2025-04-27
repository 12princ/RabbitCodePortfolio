import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, X, Check } from "lucide-react";
import "./ProjectsList.css";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editedProject, setEditedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5001/projects");
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects. Please try again later.");
      setLoading(false);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setEditMode(false);
    setImagePreview(null);
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
      setShowPopup(false);
      setProjectToDelete(null);
    }
  };

  const confirmDelete = (projectId) => {
    setProjectToDelete(projectId);
    setShowPopup(true);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setProjectToDelete(null);
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setEditedProject({ ...project });
    setImagePreview(null);
  };

  const handleUpdate = async () => {
    try {
      let response;

      const formData = new FormData();

      // Append all project fields to formData
      formData.append("projectDescription", editedProject.projectDescription);
      formData.append("projectCategory", editedProject.projectCategory);
      formData.append(
        "projectPublishedYear",
        editedProject.projectPublishedYear
      );
      formData.append("projectTitle", editedProject.projectTitle);
      formData.append("projectSubtitle", editedProject.projectSubtitle);
      formData.append("projectServices", editedProject.projectServices);
      formData.append("projectIndustries", editedProject.projectIndustries);
      formData.append("projectWebsiteLink", editedProject.projectWebsiteLink);
      formData.append("projectPrimaryTitle", editedProject.projectPrimaryTitle);
      formData.append(
        "projectPrimaryDescription",
        editedProject.projectPrimaryDescription
      );
      formData.append("projectShortTitle", editedProject.projectShortTitle);
      formData.append(
        "projectShortDescription",
        editedProject.projectShortDescription
      );
      formData.append(
        "projectSecondaryTitle",
        editedProject.projectSecondaryTitle
      );
      formData.append(
        "projectSecondaryDescription",
        editedProject.projectSecondaryDescription
      );
      formData.append(
        "projectSubSecondaryTitle",
        editedProject.projectSubSecondaryTitle
      );
      formData.append(
        "projectSubSecondaryDescription",
        editedProject.projectSubSecondaryDescription
      );
      formData.append("projectProductTitle", editedProject.projectProductTitle);
      formData.append(
        "projectProductDescription",
        editedProject.projectProductDescription
      );
      // Append image fields to formData
      if (editedProject.newImage)
        formData.append("projectImage", editedProject.newImage);
      if (editedProject.projectVideo)
        formData.append("projectVideo", editedProject.projectVideo);
      if (editedProject.projectBannerimage)
        formData.append("projectBannerimage", editedProject.projectBannerimage);
      if (editedProject.projectSubBannerimage)
        formData.append(
          "projectSubBannerimage",
          editedProject.projectSubBannerimage
        );
      if (editedProject.projectGalleryimage)
        formData.append(
          "projectGalleryimage",
          editedProject.projectGalleryimage
        );
      if (editedProject.projectSubGalleryimage)
        formData.append(
          "projectSubGalleryimage",
          editedProject.projectSubGalleryimage
        );
      if (editedProject.projectPrimaryimage)
        formData.append(
          "projectPrimaryimage",
          editedProject.projectPrimaryimage
        );
      if (editedProject.projectShortimage)
        formData.append("projectShortimage", editedProject.projectShortimage);
      if (editedProject.projectSecondaryimage)
        formData.append(
          "projectSecondaryimage",
          editedProject.projectSecondaryimage
        );
      if (editedProject.projectSubSecondaryimage)
        formData.append(
          "projectSubSecondaryimage",
          editedProject.projectSubSecondaryimage
        );
      if (editedProject.projectBrandingimage)
        formData.append(
          "projectBrandingimage",
          editedProject.projectBrandingimage
        );
      if (editedProject.projectProductimage)
        formData.append(
          "projectProductimage",
          editedProject.projectProductimage
        );
      if (editedProject.projectSubProductimage)
        formData.append(
          "projectSubProductimage",
          editedProject.projectSubProductimage
        );
      if (editedProject.projectLastimage)
        formData.append("projectLastimage", editedProject.projectLastimage);

      // Send formData to the backend
      response = await axios.put(
        `http://localhost:5001/projects/${editedProject._id}/with-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProjects(
        projects.map((p) => (p._id === editedProject._id ? response.data : p))
      );

      setSelectedProject(response.data);
      setEditMode(false);

      // Clear the form after successful submission
      setEditedProject({});
      setImagePreview(null);
    } catch (err) {
      console.error("Error updating project:", err.response ? err.response.data : err.message);
      alert("Failed to update project. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProject(null);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditedProject((prev) => ({
        ...prev,
        [name]: file, // update the specific field
      }));

      // Optional image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="projectslist">
      <h2>Update Projects</h2>
      <div className="field-container">
        {!editMode && (
          <div className="field left-field">
            {projects.map((project) => (
              <div
                key={project._id}
                className={`projectnameitem ${
                  selectedProject?._id === project._id ? "selected" : ""
                }`}
              >
                <span onClick={() => handleProjectClick(project)}>
                  {project.projectTitle}s{" "}
                </span>
                <div className="project-actions">
                  <button
                    onClick={() => handleEdit(project)}
                    className="icon-button"
                    title="Edit project"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => confirmDelete(project._id)}
                    className="icon-buttons"
                    title="Delete project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

      <div className="field project-edit-form">
        {editMode && editedProject && (
          <div className="name-1">
            <h3>{editedProject.projectTitle}</h3>
            <p> Note:- Update only the fields that need changes.</p>

            <div className="form-groups">
              <label>Project Title:</label>
              <input
                type="text"
                name="projectTitle"
                value={editedProject.projectTitle}
                onChange={handleInputChange}
                className="form-inputs"
                spellCheck="true"
              />
            </div>

            <div className="form-groups">
              <label>Project Category:</label>
              <select
                name="projectCategory"
                value={editedProject.projectCategory}
                onChange={handleInputChange}
                className="form-inputs"
              >
                <option value="">Select Category</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="web Development">Web Development</option>
                <option value="UI Design">UI Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Custom Development">Custom Development</option>
                <option value="Branding">Branding</option>
              </select>
            </div>

            <div className="form-groups">
              <label>Project Video:</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleImageChange}
                name="projectVideo"
                className="form-inputs"
                id="project-video"
              />
            </div>

            <div className="form-groups">
              <label>Published Year:</label>
              <input
                type="number"
                name="projectPublishedYear"
                value={editedProject.projectPublishedYear}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Project Title:</label>
              <input
                type="text"
                name="projectTitle"
                value={editedProject.projectTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Project Subtitle:</label>
              <input
                type="text"
                name="projectSubtitle"
                value={editedProject.projectSubtitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Project Description:</label>
              <textarea
                name="projectDescription"
                value={editedProject.projectDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Project Services:</label>
              <textarea
                name="projectServices"
                value={editedProject.projectServices}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Project Industries:</label>
              <textarea
                name="projectIndustries"
                value={editedProject.projectIndustries}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Project Website Link:</label>
              <input
                type="text"
                name="projectWebsiteLink"
                value={editedProject.projectWebsiteLink}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Project Banner Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectBannerimage"
                className="form-inputs"
                id="project-banner-image"
              />
            </div>

            <div className="form-groups">
              <label>Project Sub Banner Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectSubBannerimage"
                className="form-inputs"
                id="project-sub-banner-image"
              />
            </div>

            <div className="form-groups">
              <label>Project Gallery Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectGalleryimage"
                className="form-inputs"
                id="project-gallery-image"
              />
            </div>

            <div className="form-groups">
              <label>Project Sub Gallery Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectSubGalleryimage"
                className="form-inputs"
                id="project-sub-gallery-image"
              />
            </div>

            <div className="form-groups">
              <label>Primary Title:</label>
              <input
                type="text"
                name="projectPrimaryTitle"
                value={editedProject.projectPrimaryTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Primary Description:</label>
              <textarea
                name="projectPrimaryDescription"
                value={editedProject.projectPrimaryDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Primary Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectPrimaryimage"
                className="form-inputs"
                id="project-primary-image"
              />
            </div>

            <div className="form-groups">
              <label>Short Title:</label>
              <input
                type="text"
                name="projectShortTitle"
                value={editedProject.projectShortTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Short Description:</label>
              <textarea
                name="projectShortDescription"
                value={editedProject.projectShortDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Short Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectShortimage"
                className="form-inputs"
                id="project-short-image"
              />
            </div>

            <div className="form-groups">
              <label>Secondary Title:</label>
              <input
                type="text"
                name="projectSecondaryTitle"
                value={editedProject.projectSecondaryTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Secondary Description:</label>
              <textarea
                name="projectSecondaryDescription"
                value={editedProject.projectSecondaryDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>
            <div className="form-groups">
              <label>Secondary Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectSecondaryimage"
                className="form-inputs"
                id="project-secondary-image"
              />
            </div>

            <div className="form-groups">
              <label>Sub Secondary Title:</label>
              <input
                type="text"
                name="projectSubSecondaryTitle"
                value={editedProject.projectSubSecondaryTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Sub Secondary Description:</label>
              <textarea
                name="projectSubSecondaryDescription"
                value={editedProject.projectSubSecondaryDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Sub Secondary Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectSubSecondaryimage"
                className="form-inputs"
                id="project-sub-secondary-image"
              />
            </div>

            <div className="form-groups">
              <label>Branding Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectBrandingimage"
                className="form-inputs"
                id="project-branding-image"
              />
            </div>

            <div className="form-groups">
              <label>Product Title:</label>
              <input
                type="text"
                name="projectProductTitle"
                value={editedProject.projectProductTitle}
                onChange={handleInputChange}
                className="form-inputs"
              />
            </div>

            <div className="form-groups">
              <label>Product Description:</label>
              <textarea
                name="projectProductDescription"
                value={editedProject.projectProductDescription}
                onChange={handleInputChange}
                className="form-textareas"
              />
            </div>

            <div className="form-groups">
              <label>Product Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectProductimage"
                className="form-inputs"
                id="project-product-image"
              />
            </div>

            <div className="form-groups">
              <label>Sub Product Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectSubProductimage"
                className="form-inputs"
                id="project-sub-product-image"
              />
            </div>

            <div className="form-groups">
              <label>Last Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="projectLastimage"
                className="form-inputs "
                id="project-last-image"
              />
            </div>

            <div className="edit-actions">
              <button onClick={handleUpdate} className="save-button">
                <Check size={16} /> Save
              </button>
              <button onClick={handleCancelEdit} className="cancel-button">
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsList;
