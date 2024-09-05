import multer from "multer";
// import path from "path";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory where files will be stored
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const name =
      new Date().toISOString().replace(/:/g, "_") + file.originalname;
    // Set the filename to be unique and use the original filename
    cb(null, name);
  }
});

// File filter function to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images are allowed"), false); // Reject the file
  }
};

// Multer upload configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
  },
  fileFilter: fileFilter
});

// Middleware function to handle file uploads
// export const fileUpload = upload.single("avatar");
