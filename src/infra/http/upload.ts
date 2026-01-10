import multer from "multer";
import path from "path";

export const upload = multer({
  dest: path.resolve("tmp"),
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024, // 10GB
  },
});
