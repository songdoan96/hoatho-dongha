import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";
import { UserModel } from "../models/users.model";
import { SECRET_KEY } from "../config";

export const getAuthorization = (req: Request) => {
  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];
  return null;
};

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getAuthorization(req);
    if (token) {
      const _id = verify(token, SECRET_KEY || "hoatho");
      const user = await UserModel.findById(_id);
      if (user) {
        next();
      } else {
        next(new HttpException(401, "Token hết hạn"));
      }
    } else {
      next(new HttpException(401, "Không tìm thấy token"));
    }
  } catch (error) {
    next(new HttpException(401, "Token hết hạn"));
  }
};
