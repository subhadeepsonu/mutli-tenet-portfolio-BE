import { Response, Request } from 'express';
import prisma from '../db';
import { createSocialLinksValidator, updateSocialLinksValidator } from '../validators/scoailLinks.validator';

export async function GetSocialLinks(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const socialLinks = await prisma.socialLinks.findMany({
            where: {
                userId
            }
        })
        res.json({ success: true, data: socialLinks });
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function CreateSocialLinks(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const check = createSocialLinksValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        await prisma.socialLinks.create({
            data: {
                userId,
                ...check.data
            }
        })
        res.status(200).json({
            message: "social link created"
        })
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function UpdateSocialLinks(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        const check = updateSocialLinksValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        await prisma.socialLinks.update({
            where: {
                id,
                userId
            },
            data: {
                ...check.data
            }
        })
        res.status(200).json({
            message: "social link updated"
        })
        return
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

