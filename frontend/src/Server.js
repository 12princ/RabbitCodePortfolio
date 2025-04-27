require("dotenv").config(); // Ensure this is at the top of your file
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const AWS = require("aws-sdk");
const findFreePort = require("find-free-port");


// Initialize Express
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Fetching from .env file
  })
);

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully to Atlas"))
  .catch((err) => console.error("MongoDB Atlas connection error:", err));

// Define Project Schema with all fields
const projectSchema = new mongoose.Schema({
  projectImage: { type: String, default: null },
  projectCategory: { type: String, default: null },
  projectVideo: { type: String, default: null },
  projectPublishedYear: { type: String, required: true },
  projectTitle: { type: String, required: true },
  projectSubtitle: { type: String, default: "" },
  projectDescription: { type: String, required: true },
  projectServices: { type: String, default: "" },
  projectIndustries: { type: String, default: "" },
  projectWebsiteLink: { type: String, default: "" },
  projectBannerimage: { type: String, default: null },
  projectSubBannerimage: { type: String, default: null },
  projectGalleryimage: { type: String, default: null },
  projectSubGalleryimage: { type: String, default: null },
  projectPrimaryTitle: { type: String, default: "" },
  projectPrimaryDescription: { type: String, default: "" },
  projectPrimaryimage: { type: String, default: null },
  projectShortTitle: { type: String, default: "" },
  projectShortDescription: { type: String, default: "" },
  projectShortimage: { type: String, default: null },
  projectSecondaryTitle: { type: String, default: "" },
  projectSecondaryDescription: { type: String, default: "" },
  projectSecondaryimage: { type: String, default: null },
  projectSubSecondaryTitle: { type: String, default: "" },
  projectSubSecondaryDescription: { type: String, default: "" },
  projectSubSecondaryimage: { type: String, default: null },
  projectBrandingimage: { type: String, default: null },
  projectProductTitle: { type: String, default: "" },
  projectProductDescription: { type: String, default: "" },
  projectProductimage: { type: String, default: null },
  projectSubProductimage: { type: String, default: null },
  projectLastimage: { type: String, default: null },
  isVisible: { type: String, default: true },
});

// Create Project Model
const Project = mongoose.model("Project", projectSchema);

// Function to upload file to S3 and generate pre-signed URL
const uploadToS3 = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise().then(data => {
    const signedUrlParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: data.Key,
      Expires: 60 * 60, // URL expires in 1 hour
    };
    return s3.getSignedUrlPromise('getObject', signedUrlParams).then(url => ({
      Location: data.Location,
      SignedUrl: url,
    }));
  });
};

// Route to handle form submission with all fields
app.post(
  "/submitProject",
  upload.fields([
    { name: "projectImage", maxCount: 1 },
    { name: "projectVideo", maxCount: 1 },
    { name: "projectBannerimage", maxCount: 1 },
    { name: "projectSubBannerimage", maxCount: 1 },
    { name: "projectGalleryimage", maxCount: 1 },
    { name: "projectSubGalleryimage", maxCount: 1 },
    { name: "projectPrimaryimage", maxCount: 1 },
    { name: "projectShortimage", maxCount: 1 },
    { name: "projectSecondaryimage", maxCount: 1 },
    { name: "projectSubSecondaryimage", maxCount: 1 },
    { name: "projectBrandingimage", maxCount: 1 },
    { name: "projectProductimage", maxCount: 1 },
    { name: "projectSubProductimage", maxCount: 1 },
    { name: "projectLastimage", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      projectCategory,
      projectPublishedYear,
      projectTitle,
      projectSubtitle,
      projectDescription,
      projectServices,
      projectIndustries,
      projectWebsiteLink,
      projectPrimaryTitle,
      projectPrimaryDescription,
      projectShortTitle,
      projectShortDescription,
      projectSecondaryTitle,
      projectSecondaryDescription,
      projectSubSecondaryTitle,
      projectSubSecondaryDescription,
      projectProductTitle,
      projectProductDescription,
    } = req.body;

    try {
      const uploadPromises = [];
      const files = req.files;

      if (files) {
        // Upload files to S3 and get their URLs
        for (const key of Object.keys(files)) {
          uploadPromises.push(
            uploadToS3(files[key][0]).then((data) => ({
              [key]: data.Location,
              [`${key}SignedUrl`]: data.SignedUrl,
            }))
          );
        }
      }

      const uploadResults = await Promise.all(uploadPromises);
      const uploadedFiles = Object.assign({}, ...uploadResults);

      // Log the uploaded file URLs
      console.log("Uploaded file URLs:", uploadedFiles);

      const newProject = new Project({
        projectImage: uploadedFiles.projectImage || null,
        projectVideo: uploadedFiles.projectVideo || null,
        projectBannerimage: uploadedFiles.projectBannerimage || null,
        projectSubBannerimage: uploadedFiles.projectSubBannerimage || null,
        projectGalleryimage: uploadedFiles.projectGalleryimage || null,
        projectSubGalleryimage: uploadedFiles.projectSubGalleryimage || null,
        projectPrimaryimage: uploadedFiles.projectPrimaryimage || null,
        projectShortimage: uploadedFiles.projectShortimage || null,
        projectSecondaryimage: uploadedFiles.projectSecondaryimage || null,
        projectSubSecondaryimage: uploadedFiles.projectSubSecondaryimage || null,
        projectBrandingimage: uploadedFiles.projectBrandingimage || null,
        projectProductimage: uploadedFiles.projectProductimage || null,
        projectSubProductimage: uploadedFiles.projectSubProductimage || null,
        projectLastimage: uploadedFiles.projectLastimage || null,
        projectCategory,
        projectPublishedYear,
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectServices,
        projectIndustries,
        projectWebsiteLink,
        projectPrimaryTitle,
        projectPrimaryDescription,
        projectShortTitle,
        projectShortDescription,
        projectSecondaryTitle,
        projectSecondaryDescription,
        projectSubSecondaryTitle,
        projectSubSecondaryDescription,
        projectProductTitle,
        projectProductDescription,
      });

      // Save the project data in MongoDB
      await newProject.save();
      res.status(200).json({ message: "Project saved successfully" });
    } catch (error) {
      console.error("Error saving project:", error);
      res.status(500).json({ message: "Error saving project", error: error.message });
    }
  }
);

// Fetch a single project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("Project data fetched from database:", project);
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
});

// Fetch all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Projects data fetched from database:", projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Start the server
const startServer = () => {
  const PORT = process.env.PORT || 5001;
  findFreePort(PORT, (err, freePort) => {
    if (err) {
      console.error("Error finding free port:", err);
      process.exit(1);
    }
    app.listen(freePort, () => {
      console.log(`Server running on port ${freePort} successfully`);
    });
  });
};

startServer();

// Update a project
app.put(
  "/projects/:id",
  upload.fields([
    { name: "projectImage", maxCount: 1 },
    { name: "projectVideo", maxCount: 1 },
    { name: "projectBannerimage", maxCount: 1 },
    { name: "projectSubBannerimage", maxCount: 1 },
    { name: "projectGalleryimage", maxCount: 1 },
    { name: "projectSubGalleryimage", maxCount: 1 },
    { name: "projectPrimaryimage", maxCount: 1 },
    { name: "projectShortimage", maxCount: 1 },
    { name: "projectSecondaryimage", maxCount: 1 },
    { name: "projectSubSecondaryimage", maxCount: 1 },
    { name: "projectBrandingimage", maxCount: 1 },
    { name: "projectProductimage", maxCount: 1 },
    { name: "projectSubProductimage", maxCount: 1 },
    { name: "projectLastimage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Destructure fields from the request body
      const {
        projectCategory,
        projectPublishedYear,
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectServices,
        projectIndustries,
        projectWebsiteLink,
        projectPrimaryTitle,
        projectPrimaryDescription,
        projectShortTitle,
        projectShortDescription,
        projectSecondaryTitle,
        projectSecondaryDescription,
        projectSubSecondaryTitle,
        projectSubSecondaryDescription,
        projectProductTitle,
        projectProductDescription,
      } = req.body;

      // Gather the file paths from the uploaded files (if any)
      const files = req.files;
      const updatedFields = {
        projectCategory,
        projectPublishedYear,
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectServices,
        projectIndustries,
        projectWebsiteLink,
        projectPrimaryTitle,
        projectPrimaryDescription,
        projectShortTitle,
        projectShortDescription,
        projectSecondaryTitle,
        projectSecondaryDescription,
        projectSubSecondaryTitle,
        projectSubSecondaryDescription,
        projectProductTitle,
        projectProductDescription,
      };

      // If a file was uploaded, add its path to the updatedFields
      if (files) {
        const uploadPromises = [];
        for (const key of Object.keys(files)) {
          uploadPromises.push(
            uploadToS3(files[key][0]).then((data) => ({
              [key]: data.Location,
            }))
          );
        }
        const uploadResults = await Promise.all(uploadPromises);
        const uploadedFiles = Object.assign({}, ...uploadResults);
        Object.assign(updatedFields, uploadedFiles);

        // Log the uploaded file URLs
        console.log("Uploaded file URLs:", uploadedFiles);
      }

      // Find the project by ID and update with the new data
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true } // This option returns the updated document
      );

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res
        .status(500)
        .json({ message: "Error updating project", error: error.message });
    }
  }
);

// Update a project with image
app.put(
  "/projects/:id/with-image",
  upload.fields([
    { name: "projectImage", maxCount: 1 },
    { name: "projectVideo", maxCount: 1 },
    { name: "projectBannerimage", maxCount: 1 },
    { name: "projectSubBannerimage", maxCount: 1 },
    { name: "projectGalleryimage", maxCount: 1 },
    { name: "projectSubGalleryimage", maxCount: 1 },
    { name: "projectPrimaryimage", maxCount: 1 },
    { name: "projectShortimage", maxCount: 1 },
    { name: "projectSecondaryimage", maxCount: 1 },
    { name: "projectSubSecondaryimage", maxCount: 1 },
    { name: "projectBrandingimage", maxCount: 1 },
    { name: "projectProductimage", maxCount: 1 },
    { name: "projectSubProductimage", maxCount: 1 },
    { name: "projectLastimage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        projectCategory,
        projectPublishedYear,
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectServices,
        projectIndustries,
        projectWebsiteLink,
        projectPrimaryTitle,
        projectPrimaryDescription,
        projectShortTitle,
        projectShortDescription,
        projectSecondaryTitle,
        projectSecondaryDescription,
        projectSubSecondaryTitle,
        projectSubSecondaryDescription,
        projectProductTitle,
        projectProductDescription,
      } = req.body;

      // Prepare the update data
      const updateData = {
        projectCategory,
        projectPublishedYear,
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectServices,
        projectIndustries,
        projectWebsiteLink,
        projectPrimaryTitle,
        projectPrimaryDescription,
        projectShortTitle,
        projectShortDescription,
        projectSecondaryTitle,
        projectSecondaryDescription,
        projectSubSecondaryTitle,
        projectSubSecondaryDescription,
        projectProductTitle,
        projectProductDescription,
      };

      // Check for uploaded files and update accordingly
      const files = req.files;

      if (files) {
        const uploadPromises = [];
        for (const key of Object.keys(files)) {
          uploadPromises.push(
            uploadToS3(files[key][0]).then((data) => ({
              [key]: data.Location,
            }))
          );
        }
        const uploadResults = await Promise.all(uploadPromises);
        const uploadedFiles = Object.assign({}, ...uploadResults);
        Object.assign(updateData, uploadedFiles);

        // Log the uploaded file URLs
        console.log("Uploaded file URLs:", uploadedFiles);
      }

      // Find and update the project in the database
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res
        .status(500)
        .json({ message: "Error updating project", error: error.message });
    }
  }
);

// Delete a project
app.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
});

app.patch("/projects/:id/toggle-visibility", async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { isVisible },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error toggling project visibility:", error);
    res.status(500).json({ message: "Error updating project visibility" });
  }
});

// Modify your existing GET projects route to include isVisible in the response
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Projects data fetched from database:", projects);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// If you have a route for getting projects on the user side,
// modify it to only return visible projects
app.get("/public/projects", async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
