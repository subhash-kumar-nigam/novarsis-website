const Applyform = require("../models/apply.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ====================================================
// Generate Unique Folder Name
// ====================================================
const generateFolderName = () => {
  return new Date().toISOString().replace(/[-:TZ.]/g, "");
};

// ====================================================
// Make sure uploads directory exists
// ====================================================
const baseUploadPath = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(baseUploadPath)) {
  fs.mkdirSync(baseUploadPath, { recursive: true });
}

// ====================================================
// Multer Storage Configuration
// ====================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = generateFolderName();
    const uploadPath = path.join(baseUploadPath, folderName);
    fs.mkdirSync(uploadPath, { recursive: true });
    req.uploadFolder = folderName; // store for later reference
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ====================================================
// Multer Upload Middleware
// ====================================================
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }
    cb(null, true);
  },
});

// ====================================================
// CREATE — POST /api/v1/apply
// ====================================================
exports.create = [
  upload.single("resume"), // ✅ Must match the frontend field name
  async (req, res) => {
    try {
      const { name, email, number, experience, currentCTC, expectedCTC } = req.body;

      // Basic validation
      if (!name || !email || !number) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and number are required.",
        });
      }

      // Handle uploaded file
      const resumeFile = req.file
        ? `${req.uploadFolder}/${req.file.filename}`
        : null;

      // Save to DB
      const newApplication = await Applyform.create({
        name,
        email,
        number,
        experience,
        currentCTC,
        expectedCTC,
        resume: resumeFile,
      });

      return res.status(201).json({
        success: true,
        message: "Application submitted successfully.",
        data: newApplication,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error saving application.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// GET ALL — GET /api/v1/apply
// ====================================================
exports.findAll = async (req, res) => {
  try {
    const applications = await Applyform.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.json({ success: true, data: applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// GET ONE — GET /api/v1/apply/:id
// ====================================================
exports.findOne = async (req, res) => {
  try {
    const application = await Applyform.findByPk(req.params.id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found." });
    }
    return res.json({ success: true, data: application });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// UPDATE — PUT /api/v1/apply/:id
// ====================================================
exports.update = [
  upload.single("resume"), // ✅ keep same field name for consistency
  async (req, res) => {
    try {
      const id = req.params.id;
      const application = await Applyform.findByPk(id);

      if (!application) {
        return res
          .status(404)
          .json({ success: false, message: "Application not found." });
      }

      const { name, email, number, experience, currentCTC, expectedCTC } =
        req.body;

      if (!name || !email || !number) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and number are required.",
        });
      }

      // Handle new resume
      if (req.file) {
        if (application.resume) {
          const oldPath = path.join(baseUploadPath, application.resume);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        application.resume = `${req.uploadFolder}/${req.file.filename}`;
      }

      // Update text fields
      Object.assign(application, {
        name,
        email,
        number,
        experience,
        currentCTC,
        expectedCTC,
      });

      await application.save();

      return res.json({
        success: true,
        message: "Application updated successfully.",
        data: application,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating record.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// DELETE — DELETE /api/v1/apply/:id
// ====================================================
exports.delete = async (req, res) => {
  try {
    const application = await Applyform.findByPk(req.params.id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found." });
    }

    if (application.resume) {
      const filePath = path.join(baseUploadPath, application.resume);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Applyform.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
