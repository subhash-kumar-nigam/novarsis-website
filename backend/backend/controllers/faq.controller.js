const Faq = require("../models/faq.model");

// ====================================================
// CREATE — POST /api/v1/faq
// ====================================================
exports.create = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required.",
      });
    }

    const newFaq = await Faq.create({ question, answer });

    return res.status(201).json({
      success: true,
      message: "FAQ created successfully.",
      data: newFaq,
    });
  } catch (error) {
    console.error("❌ FAQ Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating FAQ.",
      error: error.message,
    });
  }
};

// ====================================================
// GET ALL — GET /api/v1/faq
// ====================================================
exports.findAll = async (req, res) => {
  try {
    const faqs = await Faq.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      message: "FAQs fetched successfully.",
      data: faqs,
    });
  } catch (error) {
    console.error("❌ FAQ Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching FAQs.",
      error: error.message,
    });
  }
};

// ====================================================
// GET ONE — GET /api/v1/faq/:id
// ====================================================
exports.findOne = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error("❌ FAQ Fetch One Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching FAQ.",
      error: error.message,
    });
  }
};

// ====================================================
// UPDATE — PUT /api/v1/faq/:id
// ====================================================
exports.update = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await Faq.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required.",
      });
    }

    faq.question = question;
    faq.answer = answer;
    await faq.save();

    return res.status(200).json({
      success: true,
      message: "FAQ updated successfully.",
      data: faq,
    });
  } catch (error) {
    console.error("❌ FAQ Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating FAQ.",
      error: error.message,
    });
  }
};

// ====================================================
// DELETE — DELETE /api/v1/faq/:id
// ====================================================
exports.delete = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    await Faq.destroy({ where: { id: req.params.id } });

    return res.status(200).json({
      success: true,
      message: "FAQ deleted successfully.",
    });
  } catch (error) {
    console.error("❌ FAQ Delete Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting FAQ.",
      error: error.message,
    });
  }
};
