import { Request, Response } from 'express';
import prisma from '../db';
import { createExperienceValidator, updateExperienceValidator } from '../validators/experience.validator';
export async function GetExperience(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const experience = await prisma.experience.findMany({
            where: {
                userId
            }
        });
        res.json({ success: true, data: experience });
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function CreateExperience(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const check = createExperienceValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return
        }

        await prisma.experience.create({
            data: {
                title: check.data.title,
                company: check.data.company,
                startDate: check.data.startDate,
                endDate: check.data.endDate,
                description: check.data.description,
                userId: userId,
                location: check.data.location,
                position: check.data.position
            }
        })
        res.status(200).json({
            message: "experience created"
        })
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function UpdateExperience(req: Request, res: Response) {
    try {
        const body = req.body;
        const id = req.params.id;
        const userId = req.userId!;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        const check = updateExperienceValidator.safeParse(body)
        console.error(check.error)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return
        }
        await prisma.experience.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                title: check.data.title,
                company: check.data.company,
                startDate: check.data.startDate,
                endDate: check.data.endDate,
                description: check.data.description,
                location: check.data.location,
                position: check.data.position
            }
        })
        res.status(200).json({
            message: "experience updated"
        })
        return

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function DeleteExperience(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const userId = req.userId!;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        await prisma.experience.delete({
            where: {
                id: id,
                userId: userId
            }
        })
        res.status(200).json({
            message: "experience deleted"
        })
        return
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}
