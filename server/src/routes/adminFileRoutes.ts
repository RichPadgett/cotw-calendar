import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const router = Router();

function getParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] : value ?? "";
}



const upload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      
      const year = getParam(req.params.year);
      const month = getParam(req.params.month);
      const day = getParam(req.params.day);

      const folder = path.join(
        process.cwd(),
        "content",
        "files",
        year,
        month,
        day
      );

      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    },

    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");

      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
});

router.post("/:year/:month/:day/files", upload.single("file"), (req, res) => {
  const { year, month, day } = req.params;

  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded.",
    });
  }

  res.json({
    filename: req.file.filename,
    url: `/files/${year}/${month}/${day}/${req.file.filename}`,
  });
});

export default router;