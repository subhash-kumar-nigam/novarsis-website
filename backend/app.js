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

// Routes
const indexRouter = require("./routes/index");

// ==============================
// Environment Configuration
// ==============================
dotenv.config();

// ==============================
// App Initialization
// ==============================
const app = express();
const upload = multer(); // ✅ Add this line

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
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001" , "novarsis-full-c1fe.vercel.app" , "novarsis-full-ofgm.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(upload.none()); // ✅ This now works fine

// ==============================
// Static File Routes
// ==============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gallery", express.static(path.join(__dirname, "gallery")));
app.use("/uploads", express.static(path.join(__dirname, "uploads/resumes")));
app.use(
  "/appointment_report",
  express.static(path.join(__dirname, "appointment_report"))
);

// ==============================
// Swagger Documentation
// ==============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ==============================
// Root Route
// ==============================
app.get("/", (req, res) => {
  res.json({ message: "Server is running fine ✅" });
});

// ==============================
// Main Routes
// ==============================
app.use("/api/v1", indexRouter);

// ==============================
// Error Handling Middleware
// ==============================
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ success: false, message: err.message });
});

// ==============================
// Server Start
// ==============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
