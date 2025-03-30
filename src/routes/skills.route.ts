import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateSkills, DeleteSkills, GetSkills, UpdateSkills } from "../controllers/skills.controller";
export const SkillsRouter = Router();

SkillsRouter.get("/", middleware, GetSkills)
SkillsRouter.post("/", middleware, CreateSkills)
SkillsRouter.put("/", middleware, UpdateSkills)
SkillsRouter.delete("/:id", middleware, DeleteSkills)