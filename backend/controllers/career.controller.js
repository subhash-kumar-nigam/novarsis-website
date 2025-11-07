// =====================================
// Import dependencies
// =====================================
const { Op } = require("sequelize");
const Career = require("../models/career.model");

// =====================================
// Helper Function: Format Date
// =====================================
const formatCustomDate = (date, format = "MM-DD-YYYY HH:mm:ss") => {
  const d = new Date(date);
  const pad = (num) => num.toString().padStart(2, "0");

  return format
    .replace("MM", pad(d.getMonth() + 1))
    .replace("DD", pad(d.getDate()))
    .replace("YYYY", d.getFullYear())
    .replace("HH", pad(d.getHours()))
    .replace("mm", pad(d.getMinutes()))
    .replace("ss", pad(d.getSeconds()));
};

// =====================================
// CREATE — Add new career/job
// =====================================
exports.create = async (req, res) => {
  try {
    console.log("📦 Incoming Body:", req.body); // 👈 Debugging

    const { title, location, type, experience, description } = req.body;

    // ✅ Validate required fields
    if (
      !title ||
      !location ||
      !type ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, location, type, and experience are required",
      });
    }

    // ✅ Create record
    const newCareer = await Career.create({
      title: title.trim(),
      location: location.trim(),
      type: type.trim(),
      experience: experience.trim(),
      description: description ? description.trim() : null,
    });

    return res.status(201).json({
      success: true,
      message: "Career created successfully",
      data: newCareer,
    });
  } catch (error) {
    console.error("❌ Create Career Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating career record",
      error: error.message,
    });
  }
};

// =====================================
// GET ALL — Fetch all career openings
// =====================================
exports.findAll = async (req, res) => {
  try {
    const careers = await Career.findAll({
      order: [["createdAt", "DESC"]],
    });

    const formattedCareers = careers.map((job) => ({
      ...job.toJSON(),
      createdAt: formatCustomDate(job.createdAt),
      updatedAt: formatCustomDate(job.updatedAt),
    }));

    return res.status(200).json({
      success: true,
      message: "Careers fetched successfully",
      data: formattedCareers,
    });
  } catch (error) {
    console.error("❌ Find All Careers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving careers",
      error: error.message,
    });
  }
};

// =====================================
// UPDATE — Update a career by ID
// =====================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Career.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Career with id=${id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career updated successfully",
    });
  } catch (error) {
    console.error("❌ Update Career Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating career",
      error: error.message,
    });
  }
};

// =====================================
// DELETE — Remove career by ID
// =====================================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Career.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Career with id=${id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Career Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting career",
      error: error.message,
    });
  }
};
