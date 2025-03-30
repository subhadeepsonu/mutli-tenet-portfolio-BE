import { Router } from "express";
import { CreateSocialLinks, GetSocialLinks } from "../controllers/socailLinks.controller";
import middleware from "../middleware/middleware";

export const SocialLinksRouter = Router();

SocialLinksRouter.get("/", middleware, GetSocialLinks)
SocialLinksRouter.post("/", middleware, CreateSocialLinks)
