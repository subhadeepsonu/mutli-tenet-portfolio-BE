import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateExperience, DeleteExperience, GetExperience, UpdateExperience } from "../controllers/experience.controller";
export const ExperienceRouter = Router();

ExperienceRouter.get("/", middleware, GetExperience)
ExperienceRouter.post("/", middleware, CreateExperience)
ExperienceRouter.put("/:id", middleware, UpdateExperience)
ExperienceRouter.delete("/:id", middleware, DeleteExperience)