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
                message: check.error
            });
            return
        }
        const user = await prisma.user.findFirst({
            where: {
                email: check.data.email,
            }
        });
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
            return
        }
        const checkPassword = await bcrypt.compare(check.data.password, user.password);

        if (!checkPassword) {
            res.json({
                success: false,
                message: "Password is incorrect"
            });
            return
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.json({
            success: true,
            message: "User logged in successfully",
            data: token
        });
        return
    } catch (error) {
        res.json({
            success: false,
            message: error
        });
        return
    }

}

export async function UserRegister(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userRegisterValidator.safeParse(body);
        if (!check.success) {
            res.json({
                success: false,
                message: check.error
            });
            return
        }
        const checkUser = await prisma.user.findFirst({
            where: {
                email: check.data.email,
            }
        });

        if (checkUser) {
            res.json({
                success: false,
                message: "User already exists"
            });
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(check.data.password, salt);
        const user = await prisma.user.create({
            data: {
                email: check.data.email,
                password: hashedPassword,
                domain: check.data.domain

            }
        })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.json({
            success: true,
            message: "User registered successfully",
            data: token
        });
        return
    } catch (error) {
        res.json({
            success: false,
            message: error
        });
        return
    }
}

export async function GetProfile(req: Request, res: Response) {
    try {
        const domain = req.query.domain;
        if (!domain) {
            res.json({
                success: false,
                message: "Domain is required"
            });
            return
        }
        const profile = await prisma.user.findUnique({
            where: {
                domain: domain.toString()
            },
            include: {
                experience: true,
                skills: true,
                socialLink: true,
                projects: true,
                style: true
            }
        })
        res.json({
            success: true,
            message: "Profile fetched successfully",
            data: profile
        });
        return
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        });
        return

    }
}

export async function UpdateProfile(req: Request, res: Response) {
    try {
        const userId = req.userId
        const body = req.body
        const check = userUpdateValidator.safeParse(body);
        if (!check.success) {
            res.json({
                success: false,
                message: check.error
            });
            return
        }
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                bio: check.data.bio,
                domain: check.data.domain
            }
        })
        res.json({
            success: true,
            message: "Profile updated successfully"
        });
        return
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        });
        return
    }
}

export async function DeleteProfile(req: Request, res: Response) {
    try {
        const userId = req.userId
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        res.json({
            success: true,
            message: "Account deleted"
        })
        return
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        });
        return
    }
}