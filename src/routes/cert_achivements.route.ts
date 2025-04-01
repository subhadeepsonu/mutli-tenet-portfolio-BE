import { Router } from "express";
import middleware from "../middleware/middleware";
import { CreateCertAchievements, DeleteCertAchievements, GetCertAchievements, UpdateCertAchievements } from "../controllers/cert_achivemenst.controller";

export const CertAchivementsRouter = Router();

CertAchivementsRouter.get("/", middleware, GetCertAchievements)
CertAchivementsRouter.post("/", middleware, CreateCertAchievements)
CertAchivementsRouter.put("/:id", middleware, UpdateCertAchievements)
CertAchivementsRouter.delete("/:id", middleware, DeleteCertAchievements)