const express = require("express");
const multer = require("multer");
const contactus = require("../controllers/contactus.controller");

const router = express.Router();
const upload = multer(); // handles multipart/form-data (no files, only fields)

// ✅ Public create route (handles form-data)
router.post("/", upload.none(), contactus.create);

// ✅ Admin routes (can remain same)
router.get("/", contactus.findAll);
router.patch("/:id", contactus.update);
router.delete("/:id", contactus.delete);

module.exports = router;
