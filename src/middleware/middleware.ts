import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
export default function middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({
                success: false,
                message: "Token is required"
            });
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded) {
            if (typeof decoded === "string") {
                res.status(403).json({
                    message: "You are not logged in"
                })
                return;
            }
            req.userId = (decoded as JwtPayload).id;
            next()
        } else {
            res.status(403).json({
                message: "You are not logged in"
            })
            return
        }
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        });
        return
    }
}