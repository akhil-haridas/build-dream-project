const multer = require("multer");

const multerConfig = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error("File type not supported. Only image files are allowed."),
        false
      );
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

  return upload;
};

module.exports = multerConfig;
