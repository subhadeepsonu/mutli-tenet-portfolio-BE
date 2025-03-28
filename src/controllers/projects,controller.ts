import { Request, Response } from 'express';
import prisma from '../db';
import { createProjectValidator, updateProjectValidator } from '../validators/projects.validator';
export async function GetProjects(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const projects = await prisma.projects.findMany({
            where: {
                userId
            },
            orderBy: {
                index: "asc"
            }
        });
        res.json({ success: true, data: projects });
        return
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export async function CreateProjects(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;
        const check = createProjectValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        const projects = await prisma.projects.findMany({
            where: {
                userId
            },
        });
        await prisma.projects.create({
            data: {
                userId,
                ...check.data,
                index: projects.length + 1
            }
        })

        res.status(200).json({
            message: "project created"
        })
        return
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
        return
    }
}

export async function UpdateProjects(req: Request, res: Response) {
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
        const check = updateProjectValidator.safeParse(body)
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error
            });
            return
        }
        await prisma.projects.update({
            where: {
                id: id
            },
            data: {
                ...check.data
            }
        })
        res.status(200).json({
            message: "project updated"
        })
        return
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export async function DeleteProjects(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "id is required"
            });
            return
        }
        await prisma.projects.delete({
            where: {
                id: id,
                userId
            }
        })

        res.status(200).json({
            message: "project deleted"
        })
        return

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}