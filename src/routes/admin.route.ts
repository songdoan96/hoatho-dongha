import { Router } from "express";
import path from "path";
import AdminController from "../controllers/admin.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const AdminRouter = Router();
AdminRouter.post("/upload", AuthMiddleware, upload.single("file"), AdminController.upload);
AdminRouter.post("/upload/:id", AuthMiddleware, AdminController.changeActive);
AdminRouter.delete("/upload/:id", AuthMiddleware, AdminController.deleteImage);
AdminRouter.get("/welcome", AdminController.getImages);

export { AdminRouter };
