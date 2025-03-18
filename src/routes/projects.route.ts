import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateProjects, DeleteProjects, GetProjects, UpdateProjects } from "../controllers/projects,controller";

export const ProjectsRouter = Router();

ProjectsRouter.get("/", GetProjects)
ProjectsRouter.post("/", middleware, CreateProjects)
ProjectsRouter.put("/", middleware, UpdateProjects)
ProjectsRouter.delete("/", middleware, DeleteProjects)