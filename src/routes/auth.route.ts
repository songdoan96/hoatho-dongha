import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/me", AuthMiddleware, AuthController.me);

export { AuthRouter };
