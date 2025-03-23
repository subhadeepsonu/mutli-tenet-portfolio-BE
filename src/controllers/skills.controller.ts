import { Request, Response } from 'express';
import prisma from '../db';
import { createSkillValidator, updateSkillValidator } from '../validators/skills.validator';
export async function GetSkills(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const data = await prisma.skills.findMany({
            where: {
                userId
            }
        });
        res.json({ success: true, data });
        return
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}
export async function CreateSkills(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const check = createSkillValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        await prisma.skills.create({
            data: {
                name: check.data.name,
                userId
            }
        })
        res.status(200).json({
            message: "skill created"
        })
        return
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function UpdateSkills(req: Request, res: Response) {
    try {
        const body = req.body;
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        const check = updateSkillValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }

        await prisma.skills.update({
            where: {
                id,
                userId: req.userId
            },
            data: {
                name: check.data.name
            }
        })
        res.status(200).json({
            message: "skill updated"
        })
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function DeleteSkills(req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        await prisma.skills.delete({
            where: {
                id,
                userId: req.userId
            }
        })
        res.status(200).json({
            message: "skill deleted"
        })
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}