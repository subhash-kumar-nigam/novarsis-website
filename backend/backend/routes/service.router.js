const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

// Public Routes
router.post("/", serviceController.create);
router.get("/", serviceController.findAll);
router.get("/:id", serviceController.findOne);
router.patch("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

module.exports = router;
