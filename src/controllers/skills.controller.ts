import { Request, Response } from 'express';
import prisma from '../db';
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

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function UpdateSkills(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}

export async function DeleteSkills(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
        return
    }
}