import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateProjects, DeleteProjects, GetProjects, UpdateProjects } from "../controllers/projects.controller";

export const ProjectsRouter = Router();

ProjectsRouter.get("/", middleware, GetProjects)
ProjectsRouter.post("/", middleware, CreateProjects)
ProjectsRouter.put("/:id", middleware, UpdateProjects)
ProjectsRouter.delete("/:id", middleware, DeleteProjects)