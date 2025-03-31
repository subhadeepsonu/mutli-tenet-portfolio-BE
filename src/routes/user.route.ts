import { Router } from "express";
import { DeleteProfile, GetProfile, Me, UpdateProfile, UserLogin, UserRegister } from "../controllers/user.controller";
import middleware from "../middleware/middleware";

export const UserRouter = Router();

UserRouter.post("/login", UserLogin)
UserRouter.post("/register", UserRegister)
UserRouter.get("/profile", GetProfile)
UserRouter.get("/me", middleware, Me)
UserRouter.put("/profile", middleware, UpdateProfile)
UserRouter.delete("/profile", middleware, DeleteProfile)