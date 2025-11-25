const express = require("express");
const router = express.Router();
const applyController = require("../controllers/apply.controller");

router.post("/", applyController.create);
router.get("/", applyController.findAll);
router.get("/:id", applyController.findOne);
router.put("/:id", applyController.update);
router.delete("/:id", applyController.delete);

module.exports = router;
