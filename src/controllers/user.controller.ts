import { Request, Response } from 'express';
import { userLoginValidator, userRegisterValidator, userUpdateValidator } from '../validators/user.validator';
import prisma from "../db"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function UserLogin(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userLoginValidator.safeParse(body);
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return
        }

        const user = await prisma.user.findFirst({ where: { email: check.data.email } });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return
        }

        const checkPassword = await bcrypt.compare(check.data.password, user.password);
        if (!checkPassword) {
            res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
            return
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: token
        });
        return
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return
    }
}

export async function UserRegister(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userRegisterValidator.safeParse(body);
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return
        }
        const checkUser = await prisma.user.findFirst({ where: { email: check.data.email } });
        if (checkUser) {
            res.status(409).json({
                success: false,
                message: "User already exists"
            });
            return
        }

        const checkDomain = await prisma.user.findFirst({ where: { domain: check.data.domain.toLowerCase() } });
        if (checkDomain) {
            res.status(409).json({
                success: false,
                message: "Domain is taken"
            });
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(check.data.password, salt);
        const user = await prisma.user.create({
            data: {
                email: check.data.email,
                password: hashedPassword,
                domain: check.data.domain.toLowerCase()
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: token
        });
        return
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return
    }
}

export async function GetProfile(req: Request, res: Response) {
    try {
        const domain = req.query.domain;
        if (!domain) {
            res.status(400).json({
                success: false,
                message: "Domain is required"
            });
            return
        }

        const profile = await prisma.user.findUnique({
            where: { domain: domain.toString() },
            include: {
                experience: true,
                skills: true,
                projects: true,
            }
        });

        if (!profile) {
            res.json({
                success: false,
                message: "Profile not found"
            });
            return
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: profile
        });
        return
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return
    }
}

export async function UpdateProfile(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const body = req.body;

        const check = userUpdateValidator.safeParse(body);
        if (!check.success) {
            res.status(400).json({
                success: false,
                message: check.error.message
            });
            return
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                bio: check.data.bio,
                domain: check.data.domain,
                github: check.data.github,
                linkedin: check.data.linkedin,
                twitter: check.data.twitter,
                theme: check.data.theme
            }
        });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
        return
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return
    }
}

export async function DeleteProfile(req: Request, res: Response) {
    try {
        const userId = req.userId;
        await prisma.user.delete({ where: { id: userId } });

        res.status(200).json({
            success: true,
            message: "Account deleted"
        });
        return
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        return
    }
}