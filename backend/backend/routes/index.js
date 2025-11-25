const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authGuard = require("../middleware/authGuard");
const schema = require("../validations/auth.validation");
const validate = require("../utils/validator");

// Routers
const contactus = require("./contactus.router");
const apply = require("./apply.router");
const careerRoutes = require("./career.routes")
const blog = require("./blog.routes")
const admin = require("./admin.router")
const gallery = require("./gallery.router")
const service = require("./service.router")
const faq = require("./faq.routes")
const team = require("./team.router")

// ===============================
// Route Registration
// ===============================
router.use("/contactus", contactus);
router.use("/apply", apply);
router.use("/career", careerRoutes);
router.use("/blog", blog);
router.use("/admin", admin);
router.use("/gallery", gallery);
router.use("/service", service);
router.use("/faq", faq);
router.use("/team", team);

// ===============================
// Auth Routes
// ===============================
router.post("/register", validate(schema.register), authController.register);
router.post("/login", validate(schema.login), authController.login);
router.post("/logout", authController.logout);
router.get("/users", authGuard, authController.getUser);

// ===============================
// Example Home Route (Optional)
// ===============================
router.get("/home", async (req, res) => {
  try {
    // Dummy response (you can replace this with real DB calls)
    res.status(200).json({
      message: "Home API working fine 🚀",
      data: {
        gallery: [],
        banner: [],
        product: [],
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error loading home data.",
    });
  }
});

// ===============================
// Example Dashboard (Optional)
// ===============================
router.get("/dashboard", authGuard, async (req, res) => {
  try {
    // Dummy response — replace with actual model counts if needed
    res.status(200).json({
      message: "Dashboard data fetched successfully",
      table_counts: {
        student_resume: 0,
        product: 0,
        gallery: 0,
        media: 0,
        banner: 0,
        contactus: 0,
        ourteam: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving dashboard data.",
    });
  }
});

// ===============================
// Fallback Route (for 404)
// ===============================
router.all("*", (req, res) =>
  res.status(404).json({ message: "Route not found ❌" })
);

module.exports = router;
