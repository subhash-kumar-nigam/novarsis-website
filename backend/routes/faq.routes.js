const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

// Public Routes
router.post("/", faqController.create);
router.get("/", faqController.findAll);
router.get("/:id", faqController.findOne);
router.patch("/:id", faqController.update);
router.delete("/:id", faqController.delete);

module.exports = router;
