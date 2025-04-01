import { Request, Response } from "express";
import prisma from "../db";
import { CreateCertAchievementValidator } from "../validators/cert_achivemenst.validator";
export async function GetCertAchievements(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const Certs = await prisma.certifications_achievements.findMany({
            where: {
                userId: userId,
            }
        })
        res.status(200).json({
            message: "Cert Achievements fetched successfully",
            data: Certs,
        })
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}
export async function CreateCertAchievements(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const check = CreateCertAchievementValidator.safeParse(req.body);
        if (!check.success) {
            res.status(400).json({ message: check.error.message });
            return;
        }
        await prisma.certifications_achievements.create({
            data: {
                ...check.data,
                userId: userId,
            }
        })

        res.status(200).json({
            message: "Cert Achievements created successfully"
        })
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}
export async function UpdateCertAchievements(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const userId = req.userId!;
        const check = CreateCertAchievementValidator.safeParse(req.body);
        if (!check.success) {
            res.status(400).json({ message: check.error.message });
            return;
        }
        const Cert = await prisma.certifications_achievements.findUnique({
            where: {
                id: id,
            }
        })
        if (!Cert) {
            res.status(404).json({ message: "Cert Achievement not found" });
            return;
        }
        if (Cert.userId !== userId) {
            res.status(403).json({ message: "You are not authorized to update this Cert Achievement" });
            return;
        }

        await prisma.certifications_achievements.update({
            where: {
                id: id,
            },
            data: {
                ...check.data,
            }
        })
        res.status(200).json({
            message: "Cert Achievement updated successfully",
        })
        return;

    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}
export async function DeleteCertAchievements(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const userId = req.userId!;
        const Cert = await prisma.certifications_achievements.findUnique({
            where: {
                id: id,
            }
        })
        if (!Cert) {
            res.status(404).json({ message: "Cert Achievement not found" });
            return;
        }
        if (Cert.userId !== userId) {
            res.status(403).json({ message: "You are not authorized to delete this Cert Achievement" });
            return;
        }
        await prisma.certifications_achievements.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json({
            message: "Cert Achievement deleted successfully",
        })
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}