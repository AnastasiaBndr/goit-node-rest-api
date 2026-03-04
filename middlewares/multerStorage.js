import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const uploadDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  const allowed = ["png", "jpg", "jpeg", "webp"];
  if (!allowed.includes(extension)) {
    return cb(HttpError(400, "this file type is not allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
