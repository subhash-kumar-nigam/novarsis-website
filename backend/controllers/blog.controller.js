const Blog = require("../models/blog.model");
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
const baseUploadPath = path.join(__dirname, "../uploads/blogs");
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
// CREATE — POST /api/v1/blogs
// ====================================================
exports.create = [
  upload.single("image"), // form-data field name must be "image"
  async (req, res) => {
    try {
      const { title, description, date } = req.body;

      if (!title || !description || !date) {
        return res.status(400).json({
          success: false,
          message: "Title, description, and date are required.",
        });
      }

      const imageFile = req.file
        ? `${req.uploadFolder}/${req.file.filename}`
        : null;

      const newBlog = await Blog.create({
        title,
        description,
        date,
        image: imageFile,
      });

      return res.status(201).json({
        success: true,
        message: "Blog created successfully.",
        data: newBlog,
      });
    } catch (error) {
      console.error("❌ Blog Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Error saving blog.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// GET ALL — GET /api/v1/blogs
// ====================================================
exports.findAll = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// GET ONE — GET /api/v1/blogs/:id
// ====================================================
exports.findOne = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }
    return res.json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// UPDATE — PUT /api/v1/blogs/:id
// ====================================================
exports.update = [
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findByPk(id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found." });
      }

      const { title, description, date } = req.body;

      // ✅ Use old values if new not provided
      const updatedTitle = title || blog.title;
      const updatedDescription = description || blog.description;
      const updatedDate = date || blog.date;

      // ✅ Validation only if all are missing
      if (!updatedTitle || !updatedDescription || !updatedDate) {
        return res.status(400).json({
          success: false,
          message: "Title, description, and date are required.",
        });
      }

      // ✅ Handle new image
      if (req.file) {
        if (blog.image) {
          const oldPath = path.join(baseUploadPath, blog.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        blog.image = `${req.uploadFolder}/${req.file.filename}`;
      }

      // ✅ Update data
      blog.title = updatedTitle;
      blog.description = updatedDescription;
      blog.date = updatedDate;

      await blog.save();

      return res.json({
        success: true,
        message: "Blog updated successfully.",
        data: blog,
      });
    } catch (error) {
      console.error("❌ Blog Update Error:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating blog.",
        error: error.message,
      });
    }
  },
];


// ====================================================
// DELETE — DELETE /api/v1/blogs/:id
// ====================================================
exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    // Delete file if exists
    if (blog.image) {
      const filePath = path.join(baseUploadPath, blog.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Blog.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Blog Delete Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
