import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { WelcomeModel } from "../models/welcomes.model";
class AuthController {
  async getImages(req: Request, res: Response, next: NextFunction) {
    const images = await WelcomeModel.find();
    return res.json({ images });
  }
  async upload(req: any, res: Response, next: NextFunction) {
    if (req.file.path) {
      await WelcomeModel.create({ image: req.file.filename });
    }
    return res.json({ message: "Upload thành công" });
  }
  async me(req: Request, res: Response, next: NextFunction) {
    // const token = getAuthorization(req);
    return res.json(true);
  }
}
export default new AuthController();
