const express = require("express");
const multer = require("multer");
const career = require("../controllers/career.controller");

const router = express.Router();
const upload = multer(); // ✅ for parsing form-data (no files)

// ✅ Public route — handle form-data
router.post("/", upload.none(), career.create);

// ✅ Admin routes
router.get("/", career.findAll);
router.patch("/:id", upload.none(), career.update);
router.delete("/:id", career.delete);

module.exports = router;
