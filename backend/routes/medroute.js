import express from "express";
import multer from "multer";
import { addmedicine, listmedicine ,removemedicine } from "../controllers/medcontroller.js";

const medRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

medRouter.post("/add", upload.single("image"), addmedicine);
medRouter.get("/list",listmedicine);
medRouter.post("/remove",removemedicine);


export default medRouter; 