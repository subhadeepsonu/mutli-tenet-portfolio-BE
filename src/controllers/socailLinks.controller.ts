import { Response, Request } from 'express';

export async function GetSocialLinks(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function CreateSocialLinks(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function UpdateSocialLinks(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function DeleteSocialLinks(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.status(500).json({
            success: false, message: error
        });
    }
}