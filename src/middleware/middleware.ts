import { Request, Response, NextFunction } from 'express';
export default function middleware(req: Request, res: Response, next: NextFunction) {
    console.log('middleware');
    next();
}