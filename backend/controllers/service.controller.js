const Service = require("../models/service.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ====================================================
// Generate Unique Folder Name (for uploads)
// ====================================================
const generateFolderName = () => {
  return new Date().toISOString().replace(/[-:TZ.]/g, "");
};

// ====================================================
// Ensure uploads directory exists
// ====================================================
const baseUploadPath = path.join(__dirname, "../uploads/services");
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
    req.uploadFolder = folderName; // store folder for DB
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
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(
        new Error("Only image files (JPG, JPEG, PNG, WEBP) are allowed")
      );
    }
    cb(null, true);
  },
});

// ====================================================
// CREATE — POST /api/v1/services
// ====================================================
exports.create = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required.",
        });
      }

      const imageFile = req.file
        ? `${req.uploadFolder}/${req.file.filename}`
        : null;

      const newService = await Service.create({
        title,
        description,
        image: imageFile,
      });

      return res.status(201).json({
        success: true,
        message: "Service created successfully.",
        data: newService,
      });
    } catch (error) {
      console.error("❌ Service Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Error saving service.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// GET ALL — GET /api/v1/services
// ====================================================
exports.findAll = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: services });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// GET ONE — GET /api/v1/services/:id
// ====================================================
exports.findOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found." });
    }
    return res.json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// UPDATE — PUT /api/v1/services/:id
// ====================================================
exports.update = [
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const service = await Service.findByPk(id);

      if (!service) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found." });
      }

      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required.",
        });
      }

      // Handle new image upload
      if (req.file) {
        // Delete old image if exists
        if (service.image) {
          const oldPath = path.join(baseUploadPath, service.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        service.image = `${req.uploadFolder}/${req.file.filename}`;
      }

      // Update text fields
      service.title = title;
      service.description = description;

      await service.save();

      return res.json({
        success: true,
        message: "Service updated successfully.",
        data: service,
      });
    } catch (error) {
      console.error("❌ Service Update Error:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating service.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// DELETE — DELETE /api/v1/services/:id
// ====================================================
exports.delete = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found." });
    }

    // Delete file if exists
    if (service.image) {
      const filePath = path.join(baseUploadPath, service.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Service.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Service Delete Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
