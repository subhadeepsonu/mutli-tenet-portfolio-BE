import { Response, Request } from "express";
import prisma from "../db";
import { createSocialLinksValidator, updateSocialLinksValidator } from "../validators/scoailLinks.validator";

export async function GetSocialLinks(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const socialLinks = await prisma.socialLinks.findMany({
            where: {
                userId
            }
        });

        res.status(200).json({ success: true, data: socialLinks });
        return;
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
}

export async function CreateSocialLinks(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const check = createSocialLinksValidator.safeParse(body);

        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return;
        }

        const socialLink = await prisma.socialLinks.findFirst({
            where: {
                userId
            }
        });

        if (socialLink) {
            await prisma.socialLinks.update({
                where: {
                    userId
                },
                data: check.data
            });

            res.status(200).json({
                success: true,
                message: "Social link updated"
            });
            return;
        }

        await prisma.socialLinks.create({
            data: {
                userId,
                ...check.data
            }
        });

        res.status(201).json({
            success: true,
            message: "Social link created"
        });
        return;
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
}
