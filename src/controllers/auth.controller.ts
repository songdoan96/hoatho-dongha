import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { sign } from "jsonwebtoken";
import { JWT_EXPIRATION, SECRET_KEY } from "../config";
import { HttpException } from "../exceptions/HttpException";
import UserType from "../interfaces/user.interface";
import { UserModel } from "../models/users.model";
class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password }: UserType = req.body;
    const findUser = await UserModel.findOne({
      username: { $regex: new RegExp(username, "i") },
      password,
    });
    if (!findUser) {
      throw new HttpException(409, "Tài khoản hoặc mật khẩu không đúng");
    }

    const expiresIn = Number(JWT_EXPIRATION);
    const token = sign(
      {
        _id: findUser._id,
      },
      SECRET_KEY || "hoatho",
      { expiresIn }
    );
    return res.json({ data: { token, ...findUser.toObject() }, message: "Đăng nhập thành công" });
  }
  async me(req: Request, res: Response, next: NextFunction) {
    // const token = getAuthorization(req);
    return res.json(true);
  }
}
export default new AuthController();
