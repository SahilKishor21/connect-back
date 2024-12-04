const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads"); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "application/zip"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, PDFs, and ZIPs are allowed."), false);
  }
};

// Middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter,
});

module.exports = upload;
