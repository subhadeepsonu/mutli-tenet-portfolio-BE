import { Router } from "express";
import middleware from "../middleware/middleware";
export const ExperienceRouter = Router();

ExperienceRouter.get("/",)
ExperienceRouter.post("/", middleware)
ExperienceRouter.put("/", middleware)
ExperienceRouter.delete("/", middleware)