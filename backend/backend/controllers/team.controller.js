const Team = require("../models/team.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Base folder for uploads
const baseUploadPath = path.join(__dirname, "../uploads/teams");
if (!fs.existsSync(baseUploadPath)) {
  fs.mkdirSync(baseUploadPath, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, baseUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Only JPG, JPEG, PNG, WEBP files are allowed."));
    }
    cb(null, true);
  },
});

// ====================================================
// CREATE — POST /api/v1/team
// ====================================================
exports.create = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, title } = req.body;
      if (!name || !title) {
        return res.status(400).json({
          success: false,
          message: "Name and Title are required.",
        });
      }

      const imageFile = req.file ? req.file.filename : null;

      const newTeam = await Team.create({
        name,
        title,
        image: imageFile,
      });

      res.status(201).json({
        success: true,
        message: "Team member added successfully.",
        data: newTeam,
      });
    } catch (error) {
      console.error("❌ Team Create Error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating team member.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// GET ALL — GET /api/v1/team
// ====================================================
exports.findAll = async (req, res) => {
  try {
    const members = await Team.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team members.",
      error: error.message,
    });
  }
};

// ====================================================
// GET ONE — GET /api/v1/team/:id
// ====================================================
exports.findOne = async (req, res) => {
  try {
    const member = await Team.findByPk(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Team member not found." });

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team member.",
      error: error.message,
    });
  }
};

// ====================================================
// UPDATE — PUT /api/v1/team/:id
// ====================================================
exports.update = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, title } = req.body;
      const id = req.params.id;

      const member = await Team.findByPk(id);
      if (!member)
        return res
          .status(404)
          .json({ success: false, message: "Team member not found." });

      if (!name || !title) {
        return res.status(400).json({
          success: false,
          message: "Name and Title are required.",
        });
      }

      // Update image if new file uploaded
      if (req.file) {
        if (member.image) {
          const oldPath = path.join(baseUploadPath, member.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        member.image = req.file.filename;
      }

      member.name = name;
      member.title = title;
      await member.save();

      res.json({
        success: true,
        message: "Team member updated successfully.",
        data: member,
      });
    } catch (error) {
      console.error("❌ Team Update Error:", error);
      res.status(500).json({
        success: false,
        message: "Error updating team member.",
        error: error.message,
      });
    }
  },
];

// ====================================================
// DELETE — DELETE /api/v1/team/:id
// ====================================================
exports.delete = async (req, res) => {
  try {
    const member = await Team.findByPk(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Team member not found." });

    // Delete image if exists
    if (member.image) {
      const filePath = path.join(baseUploadPath, member.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Team.destroy({ where: { id: req.params.id } });

    res.json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    console.error("❌ Team Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting team member.",
      error: error.message,
    });
  }
};
