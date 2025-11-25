const express = require("express");
const router = express.Router();
const source = require("../controllers/gallery.controller");


router.post("/", source.create);
router.get("/", source.findAll);
router.get("/one/:id",    source.findOne);
router.patch("/:id",   source.update);
router.delete("/:id",   source.delete);

module.exports = router