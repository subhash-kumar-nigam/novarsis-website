// =====================================
// Import dependencies
// =====================================
const { Op } = require("sequelize");
const ContactUs = require("../models/contactus.model");

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
// Create a new contact record
// =====================================
exports.create = async (req, res) => {
  try {
    const { name, mobile, subject, message } = req.body;

    // ✅ Validation
    if (!name?.trim() || !mobile?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and Mobile are required",
      });
    }

    // ✅ Create new record
    const newContact = await ContactUs.create({
      name: name.trim(),
      mobile: mobile.trim(),
      subject: subject?.trim() || null,
      message: message?.trim() || null,
    });

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Create Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating contact record",
      error: error.message,
    });
  }
};

// =====================================
// Retrieve all contact records
// =====================================
exports.findAll = async (req, res) => {
  try {
    const contacts = await ContactUs.findAll({
      order: [["createdAt", "DESC"]],
    });

    const formattedContacts = contacts.map((record) => ({
      ...record.toJSON(),
      createdAt: formatCustomDate(record.createdAt),
      updatedAt: formatCustomDate(record.updatedAt),
    }));

    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: formattedContacts,
    });
  } catch (error) {
    console.error("❌ Find All Error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving contacts",
      error: error.message,
    });
  }
};

// =====================================
// Update contact by ID
// =====================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await ContactUs.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Contact with id=${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error("❌ Update Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact",
      error: error.message,
    });
  }
};

// =====================================
// Delete contact by ID
// =====================================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ContactUs.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Contact with id=${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
};
