// ==============================
// Import Dependencies
// ==============================
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const log4js = require("log4js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swaggerConfig");
const dotenv = require("dotenv");
const multer = require("multer");

// ==============================
// Environment Configuration
// ==============================
dotenv.config();

// Database Connection (After dotenv)
const sequelize = require("./config/database");

// Routes
const indexRouter = require("./routes/index");

// ==============================
// App Initialization
// ==============================
const app = express();
const upload = multer();

// ==============================
// Test Database Connection
// ==============================
sequelize.authenticate()
  .then(() => console.log("🎯 MySQL Connected Successfully 🚀"))
  .catch((err) => console.error("❌ Database Connection Error:", err.message));

// ==============================
// Logger Configuration
// ==============================
log4js.configure({
  appenders: { app: { type: "file", filename: "app.log" } },
  categories: { default: { appenders: ["app"], level: "info" } },
});
const logger = log4js.getLogger("app");

// ==============================
// Middleware Configuration
// ==============================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://novarsis-website.vercel.app",
   "https://novarsis-website-7i3f.vercel.app",
   "https://novarsis-website-full.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==============================
// Static File Routes
// ==============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gallery", express.static(path.join(__dirname, "gallery")));
app.use("/uploads", express.static(path.join(__dirname, "uploads/resumes")));
app.use("/appointment_report", express.static(path.join(__dirname, "appointment_report")));

// ==============================
// Swagger
// ==============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ==============================
// Root Route
// ==============================
app.get("/", (req, res) => res.json({ message: "Server is running fine ✅" }));

// ==============================
// API Routes
// ==============================
app.use("/api/v1", indexRouter);

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ success: false, message: err.message });
});

// ==============================
// Server Start
// ==============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
