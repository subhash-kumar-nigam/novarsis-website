const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

// ====================================================
// BLOG ROUTES
// ====================================================

// Create Blog
router.post("/", blogController.create);

// Get All Blogs
router.get("/", blogController.findAll);

// Get Single Blog
router.get("/:id", blogController.findOne);

// Update Blog (PATCH is enough)
router.patch("/:id", blogController.update);

// Delete Blog
router.delete("/:id", blogController.delete);

module.exports = router;
