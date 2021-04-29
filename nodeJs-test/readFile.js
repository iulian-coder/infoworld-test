const csvParser = require("csv-parser");
const fs = require("fs");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .csv format allowed!"));
    }
  },
});

const readDataFromFile = (filepath) => {
  let data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath)
      .on("error", (error) => {
        reject(error);
      })
      .pipe(csvParser())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

module.exports = {
  upload,
  readDataFromFile,
};
