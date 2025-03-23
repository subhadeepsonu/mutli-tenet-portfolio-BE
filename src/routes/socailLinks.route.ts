import { Router } from "express";
import { CreateSocialLinks, GetSocialLinks, UpdateSocialLinks } from "../controllers/socailLinks.controller";
import middleware from "../middleware/middleware";

export const SocialLinksRouter = Router();

SocialLinksRouter.get("/", GetSocialLinks)
SocialLinksRouter.post("/", middleware, CreateSocialLinks)
SocialLinksRouter.put("/", middleware, UpdateSocialLinks)
