const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

// Routes
router.post("/", teamController.create);
router.get("/", teamController.findAll);
router.get("/:id", teamController.findOne);
router.patch("/:id", teamController.update);
router.delete("/:id", teamController.delete);

module.exports = router;
