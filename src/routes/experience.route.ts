import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateExperience, DeleteExperience, GetExperience, UpdateExperience } from "../controllers/experience.controller";
export const ExperienceRouter = Router();

ExperienceRouter.get("/", GetExperience)
ExperienceRouter.post("/", middleware, CreateExperience)
ExperienceRouter.put("/", middleware, UpdateExperience)
ExperienceRouter.delete("/", middleware, DeleteExperience)