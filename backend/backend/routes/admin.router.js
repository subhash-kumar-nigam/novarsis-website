const express = require('express');
const router = express.Router();
const admin = require("../controllers/admin.controller.js");


    router.post("/signup", admin.create);
    router.post("/signin", admin.login);
    router.post("/refresh", admin.refreshToken);
    // router.put("/:id", admin.update);
    router.get("/", admin.findAll);

module.exports = router