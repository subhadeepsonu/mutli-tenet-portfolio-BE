import { Router } from "express";
import { CreateSocialLinks, DeleteSocialLinks, GetSocialLinks, UpdateSocialLinks } from "../controllers/socailLinks.controller";
import middleware from "../middleware/middleware";

export const SocialLinksRouter = Router();

SocialLinksRouter.get("/", GetSocialLinks)
SocialLinksRouter.post("/", middleware, CreateSocialLinks)
SocialLinksRouter.put("/", middleware, UpdateSocialLinks)
SocialLinksRouter.delete("/", middleware, DeleteSocialLinks)