import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../components/ProductPage.css"; // Ensure the CSS file is properly imported
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Contact from "./Contact";
import Footer from "./Footer";

const ProductPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const scrollPage = () => {
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/projects/${id}`
        );
        setProject(response.data);
        setLoading(false);
        console.log("Project data fetched successfully:", response.data);
        console.log("Project Image URL:", response.data.projectImage);
        console.log("Project Video URL:", response.data.projectVideo);
        console.log("Project SubSecondary Image URL:", response.data.projectSubSecondaryimage);
        console.log("Project Branding Image URL:", response.data.projectBrandingimage);
        console.log("Project Product Image URL:", response.data.projectProductimage);
        // Log other URLs as needed
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to fetch project details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProject();
    scrollPage();
    window.addEventListener("pageshow", scrollPage);

    return () => {
      window.removeEventListener("load", scrollPage);
      window.removeEventListener("pageshow", scrollPage);
    };
  }, [id]);

  if (loading) return <div>Loading project details...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Project not found</div>;

  const services = project.projectServices
    ? project.projectServices.split(",").map((service) => service.trim())
    : [];

  const industries = project.projectIndustries
    ? project.projectIndustries.split(",").map((industry) => industry.trim())
    : [];

  return (
    <div id="HeroSection" className="product-page">
      <Header />
      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container1">
          {/* Banner Video/Image */}
          <AnimatedImage>
            {project.projectVideo ? (
              <motion.video
                src={project.projectVideo}
                className="banner-video"
                autoPlay
                loop
                muted
                alt="banner video"
                onLoadedData={() => console.log("Video fetched successfully from S3")}
                onError={(e) => console.error("Error loading video:", e)}
              />
            ) : (
              project.projectImage && (
                <motion.img
                  src={project.projectImage}
                  className="banner-video"
                  alt={project.projectTitle || "Project Image"}
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={(e) => console.error("Error loading image:", e)}
                />
              )
            )}
          </AnimatedImage>

          <AnimatedSection>
            <div className="published-tag">
              <span>PUBLISHED IN {project.projectPublishedYear}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h1 className="main-title">
              {project.projectTitle || "Untitled Project"}
            </h1>
          </AnimatedSection>

          {project.projectSubtitle && (
            <AnimatedSection>
              <h2 className="subtitle">{project.projectSubtitle}</h2>
            </AnimatedSection>
          )}

          <AnimatedSection>
            <div className="content-grid">
              <div className="description">
                <p>
                  {project.projectDescription || "No description available."}
                </p>
              </div>

              <div className="info-columns">
                {services.length > 0 && (
                  <div className="services">
                    <h3>SERVICES</h3>
                    <ul>
                      {services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {industries.length > 0 && (
                  <div className="industries">
                    <h3>INDUSTRIES</h3>
                    <ul>
                      {industries.map((industry, index) => (
                        <li key={index}>{industry}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {project.projectWebsiteLink && (
            <AnimatedSection>
              <div className="project-link">
                <a
                  href={project.projectWebsiteLink}
                  className="official-website-link"
                >
                  Official Website ↗
                </a>

                {project.projectCategory}
              </div>
            </AnimatedSection>
          )}

          {/* Banner and SubBanner Images */}
          {project.projectBannerimage && (
            <AnimatedImage>
              <motion.img
                src={project.projectBannerimage}
                className="banner-image"
                alt="Banner"
                onLoad={() => console.log("Banner image loaded successfully")}
                onError={(e) => console.error("Error loading banner image:", e)}
              />
            </AnimatedImage>
          )}

          {project.projectSubBannerimage && (
            <AnimatedImage>
              <motion.img
                src={project.projectSubBannerimage}
                className="banner-image"
                alt="Sub Banner"
                onLoad={() => console.log("Sub Banner image loaded successfully")}
                onError={(e) => console.error("Error loading sub banner image:", e)}
              />
            </AnimatedImage>
          )}

          {/* Gallery Images */}
          <AnimatedSection>
            <div className="image-gallery">
              {project.projectGalleryimage && (
                <motion.img
                  src={project.projectGalleryimage}
                  alt="Gallery"
                  className="gallery-image"
                  onLoad={() => console.log("Gallery image loaded successfully")}
                  onError={(e) => console.error("Error loading gallery image:", e)}
                />
              )}
              {project.projectSubGalleryimage && (
                <motion.img
                  src={project.projectSubGalleryimage}
                  alt="Sub Gallery"
                  className="gallery-image"
                  onLoad={() => console.log("Sub Gallery image loaded successfully")}
                  onError={(e) => console.error("Error loading sub gallery image:", e)}
                />
              )}
            </div>
          </AnimatedSection>

          {/* Primary Content */}
          <AnimatedSection>
            <div className="bg-gray-900 p-8">
              <div className="max-w-6xl mx-auto">
                <div className="content text-center mb-8">
                  <h2 className="section-headertitle">
                    {project.projectPrimaryTitle}
                  </h2>
                  <p>{project.projectPrimaryDescription}</p>
                </div>
                <div className="flex justify-center">
                  {project.projectPrimaryimage && (
                    <motion.img
                      src={project.projectPrimaryimage}
                      className="banner-image max-w-full"
                      alt="Primary"
                      onLoad={() => console.log("Primary image loaded successfully")}
                      onError={(e) => console.error("Error loading primary image:", e)}
                    />
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Short Content */}
          <AnimatedSection>
            <div className="bg-gray-900 p-8 mt-8">
              <div className="max-w-6xl mx-auto">
                <div className="content text-center mb-8">
                  <h2 className="section-headertitle">
                    {project.projectShortTitle}
                  </h2>
                  <p>{project.projectShortDescription}</p>
                </div>
                <div className="flex justify-center">
                  {project.projectShortimage && (
                    <motion.img
                      src={project.projectShortimage}
                      alt="Short"
                      className="banner-image max-w-full"
                      onLoad={() => console.log("Short image loaded successfully")}
                      onError={(e) => console.error("Error loading short image:", e)}
                    />
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Secondary Content */}
          <AnimatedSection>
            <div className="image-content-gallery">
              <div className="image-side">
                {project.projectSecondaryimage && (
                  <motion.img
                    src={project.projectSecondaryimage}
                    alt="Secondary"
                    className="gallery-image"
                    onLoad={() => console.log("Secondary image loaded successfully")}
                    onError={(e) => console.error("Error loading secondary image:", e)}
                  />
                )}
              </div>
              <div className="content-side">
                <h2 className="section-headertitle">
                  {project.projectSecondaryTitle}
                </h2>
                <p>{project.projectSecondaryDescription}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* SubSecondary Content */}
          <AnimatedSection>
            <div className="image-content-gallery">
              <div className="content-side">
                <h2 className="section-headertitle">
                  {project.projectSubSecondaryTitle}
                </h2>
                <p>{project.projectSubSecondaryDescription}</p>
              </div>
              <div className="image-side">
                {project.projectSubSecondaryimage && (
                  <motion.img
                    src={project.projectSubSecondaryimage}
                    alt="SubSecondary"
                    className="gallery-image"
                    onLoad={() => console.log("SubSecondary image loaded successfully")}
                    onError={(e) => console.error("Error loading subsecondary image:", e)}
                  />
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Branding Image */}
          {project.projectBrandingimage && (
            <AnimatedImage>
              <motion.img
                src={project.projectBrandingimage}
                className="banner-image"
                alt="Branding"
                onLoad={() => console.log("Branding image loaded successfully")}
                onError={(e) => console.error("Error loading branding image:", e)}
              />
            </AnimatedImage>
          )}

          {/* Product Content */}
          <AnimatedSection>
            <div className="bg-gray-900 p-8">
              <div className="max-w-6xl mx-auto">
                <div className="content text-center mb-8">
                  <h2 className="section-headertitle">
                    {project.projectProductTitle}
                  </h2>
                  <p>{project.projectProductDescription}</p>
                </div>
              </div>
              <AnimatedSection>
                <div className="image-gallery">
                  {project.projectSubProductimage && (
                    <motion.img
                      src={project.projectSubProductimage}
                      alt="Gallery"
                      className="gallery-image"
                      onLoad={() => console.log("SubProduct image loaded successfully")}
                      onError={(e) => console.error("Error loading subproduct image:", e)}
                    />
                  )}
                  {project.projectProductimage && (
                    <motion.img
                      src={project.projectProductimage}
                      alt="Sub Gallery"
                      className="gallery-image"
                      onLoad={() => console.log("Product image loaded successfully")}
                      onError={(e) => console.error("Error loading product image:", e)}
                    />
                  )}
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Last Image */}
          {project.projectLastimage && (
            <AnimatedImage>
              <motion.img
                src={project.projectLastimage}
                className="banner-image"
                alt="Last"
                onLoad={() => console.log("Last image loaded successfully")}
                onError={(e) => console.error("Error loading last image:", e)}
              />
            </AnimatedImage>
          )}
        </div>
      </motion.div>
      <Contact />
      <Footer />
    </div>
  );
};

// Reusable AnimatedSection component
const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Separate AnimatedImage component for image animations
const AnimatedImage = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ProductPage;