import React, { useState } from "react";
import axios from "axios";
import "./Adminpannel.css";

function Subproject() {
  const initialFormState = {
    projectImage: null,
    projectCategory: "",
    projectVideo: null,
    projectName: "",
    projectPublishedYear: "",
    projectTitle: "",
    projectSubtitle: "",
    projectDescription: "",
    projectServices: "",
    projectIndustries: "",
    projectWebsiteLink: "",
    projectPrimaryTitle: "",
    projectPrimaryDescription: "",
    projectShortTitle: "",
    projectShortDescription: "",
    projectSecondaryTitle: "",
    projectSecondaryDescription: "",
    projectSubSecondaryTitle: "",
    projectSubSecondaryDescription: "",
    projectProductTitle: "",
    projectProductDescription: "",
    projectBannerimage: null,
    projectSubBannerimage: null,
    projectGalleryimage: null,
    projectSubGalleryimage: null,
    projectPrimaryimage: null,
    projectShortimage: null,
    projectSecondaryimage: null,
    projectSubSecondaryimage: null,
    projectBrandingimage: null,
    projectProductimage: null,
    projectSubProductimage: null,
    projectLastimage: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Handling file input for the image
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append all form fields
    data.append("projectImage", formData.projectImage);
    data.append("projectCategory", formData.projectCategory);
    data.append("projectVideo", formData.projectVideo);
    data.append("projectPublishedYear", formData.projectPublishedYear);
    data.append("projectTitle", formData.projectTitle);
    data.append("projectSubtitle", formData.projectSubtitle);
    data.append("projectDescription", formData.projectDescription);
    data.append("projectServices", formData.projectServices);
    data.append("projectIndustries", formData.projectIndustries);
    data.append("projectWebsiteLink", formData.projectWebsiteLink);
    data.append("projectPrimaryTitle", formData.projectPrimaryTitle);
    data.append("projectPrimaryDescription", formData.projectPrimaryDescription);
    data.append("projectShortTitle", formData.projectShortTitle);
    data.append("projectShortDescription", formData.projectShortDescription);
    data.append("projectSecondaryTitle", formData.projectSecondaryTitle);
    data.append("projectSecondaryDescription", formData.projectSecondaryDescription);
    data.append("projectSubSecondaryTitle", formData.projectSubSecondaryTitle);
    data.append("projectSubSecondaryDescription", formData.projectSubSecondaryDescription);
    data.append("projectProductTitle", formData.projectProductTitle);
    data.append("projectProductDescription", formData.projectProductDescription);

    // Append all image fields
    data.append("projectBannerimage", formData.projectBannerimage);
    data.append("projectSubBannerimage", formData.projectSubBannerimage);
    data.append("projectGalleryimage", formData.projectGalleryimage);
    data.append("projectSubGalleryimage", formData.projectSubGalleryimage);
    data.append("projectPrimaryimage", formData.projectPrimaryimage);
    data.append("projectShortimage", formData.projectShortimage);
    data.append("projectSecondaryimage", formData.projectSecondaryimage);
    data.append("projectSubSecondaryimage", formData.projectSubSecondaryimage);
    data.append("projectBrandingimage", formData.projectBrandingimage);
    data.append("projectProductimage", formData.projectProductimage);
    data.append("projectSubProductimage", formData.projectSubProductimage);
    data.append("projectLastimage", formData.projectLastimage);

    try {
      const response = await axios.post(
        "http://localhost:5001/submitProject",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Project submitted successfully!");
      setMessageType("success");

      // Reset form including clearing image fields
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting project");
      setMessageType("error");
    }

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };
  return (
    <section className="project-section">
      <h2>Add New Project</h2>

      <form className="form-message" onSubmit={handleSubmit}>
        {/* Project Image */}
        <div className="formgroup">
          <label>Project Image:</label>
          <input
            type="file"
            name="projectImage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project Image"
          />
        </div>

        <div className="formgroup">
          <label>Project Category:</label>
          <select
            name="projectCategory"
            value={formData.projectCategory}
            onChange={handleChange}
            className="forminput"
          >
            <option value="">Select Category</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="web-Development">Web Development</option>
            <option value="UI-Design">UI Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Custom-Development">Custom Development</option>
            <option value="Branding">Branding</option>
          </select>
        </div>

        {/* Project Video */}
        <div className="formgroup">
          <label>Project Video:</label>
          <input
            type="file"
            name="projectVideo"
            onChange={handleFileChange}
            className="forminput"
            accept="video/*"
            placeholder="Project Video"
          />
        </div>

        {/* Other fields */}
        <div className="formgroup">
          <label>Project Published Year:</label>
          <input
            type="text"
            name="projectPublishedYear"
            value={formData.projectPublishedYear}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Published Year"
          />
        </div>

        <div className="formgroup">
          <label>Project Title:</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Title"
          />
        </div>

        <div className="formgroup">
          <label>Project SubTitle:</label>
          <input
            type="text"
            name="projectSubtitle"
            value={formData.projectSubtitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Subtitle"
          />
        </div>

        <div className="formgroup">
          <label>Project Description:</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            className="formtextarea"
            placeholder="Project Description"
          />
        </div>

        <div className="formgroup">
          <label>Project Services:</label>
          <textarea
            name="projectServices"
            value={formData.projectServices}
            onChange={handleChange}
            className="formtextarea"
            placeholder="Enter services, one per line"
            rows="2"
          />
        </div>

        <div className="formgroup">
          <label>Project Industries:</label>
          <textarea
            name="projectIndustries"
            value={formData.projectIndustries}
            onChange={handleChange}
            className="formtextarea"
            placeholder="Enter industries, one per line"
            rows="2"
          />
        </div>

        <div className="formgroup">
          <label>Project Website Link:</label>
          <input
            type="text"
            name="projectWebsiteLink"
            value={formData.projectWebsiteLink}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Website Link"
          />
        </div>

        <div className="formgroup">
          <label>Project Banner Image:</label>
          <input
            type="file"
            name="projectBannerimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project Banner image"
          />
        </div>

        <div className="formgroup">
          <label>Project SubBanner Image:</label>
          <input
            type="file"
            name="projectSubBannerimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project SubBanner image"
          />
        </div>

        <div className="formgroup">
          <label>Project Gallery Image:</label>
          <input
            type="file"
            name="projectGalleryimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project Gallery image"
          />
        </div>

        <div className="formgroup">
          <label>Project SubGallery Image:</label>
          <input
            type="file"
            name="projectSubGalleryimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project SubGallery image"
          />
        </div>
        <div className="formgroup">
          <label>Project Primary Title:</label>
          <input
            type="text"
            name="projectPrimaryTitle"
            value={formData.projectPrimaryTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Primary Title"
          />
        </div>

        <div className="formgroup">
          <label>Project Primary Description:</label>
          <input
            type="text"
            name="projectPrimaryDescription"
            value={formData.projectPrimaryDescription}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Primary Description"
          />
        </div>

        <div className="formgroup">
          <label>Project Primary Image:</label>
          <input
            type="file"
            name="projectPrimaryimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project Primary image"
          />
        </div>

        <div className="formgroup">
          <label>Project Short Titel:</label>
          <input
            type="text"
            name="projectShortTitle"
            value={formData.projectShortTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Short Title"
          />
        </div>

        <div className="formgroup">
          <label>Project Short Description:</label>
          <input
            type="text"
            name="projectShortDescription"
            value={formData.projectShortDescription}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Short Description"
          />
        </div>

        <div className="formgroup">
          <label>Project Short Image:</label>
          <input
            type="file"
            name="projectShortimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="project Short image"
          />
        </div>

        <div className="formgroup">
          <label>Project Secondary Title:</label>
          <input
            type="text"
            name="projectSecondaryTitle"
            value={formData.projectSecondaryTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Short Title"
          />
        </div>

        <div className="formgroup">
          <label>Project Secondary Description:</label>
          <input
            type="text"
            name="projectSecondaryDescription"
            value={formData.projectSecondaryDescription}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Short Description"
          />
        </div>

        <div className="formgroup">
          <label>Project Secondary Image:</label>
          <input
            type="file"
            name="projectSecondaryimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project Secondary image"
          />
        </div>

        <div className="formgroup">
          <label>Project SubSecondary Title:</label>
          <input
            type="text"
            name="projectSubSecondaryTitle"
            value={formData.projectSubSecondaryTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project SubSecondary Title"
          />
        </div>

        <div className="formgroup">
          <label>Project SubSecondary Description:</label>
          <input
            type="text"
            name="projectSubSecondaryDescription"
            value={formData.projectSubSecondaryDescription}
            onChange={handleChange}
            className="forminput"
            placeholder="Project SubSecondary Description"
          />
        </div>

        <div className="formgroup">
          <label>Project SubSecondary Image:</label>
          <input
            type="file"
            name="projectSubSecondaryimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project SubSecondary image"
          />
        </div>

        <div className="formgroup">
          <label>Project Branding Image:</label>
          <input
            type="file"
            name="projectBrandingimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project Branding image"
          />
        </div>

        <div className="formgroup">
          <label>Project Product Title:</label>
          <input
            type="text"
            name="projectProductTitle"
            value={formData.projectProductTitle}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Product Title"
          />
        </div>

        <div className="formgroup">
          <label>Project Product Description:</label>
          <input
            type="text"
            name="projectProductDescription"
            value={formData.projectProductDescription}
            onChange={handleChange}
            className="forminput"
            placeholder="Project Product Description"
          />
        </div>

        <div className="formgroup">
          <label>Project Product Image:</label>
          <input
            type="file"
            name="projectProductimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project Product image"
          />
        </div>

        <div className="formgroup">
          <label>Project SubProduct Image:</label>
          <input
            type="file"
            name="projectSubProductimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project SubProduct image"
          />
        </div>

        <div className="formgroup">
          <label>Project Last Image:</label>
          <input
            type="file"
            name="projectLastimage"
            onChange={handleFileChange}
            className="forminput"
            accept="image/*"
            placeholder="Project Last image"
          />
        </div>
        {message && (
          <p
            className={
              messageType === "success" ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </section>
  );
}
export default Subproject;
