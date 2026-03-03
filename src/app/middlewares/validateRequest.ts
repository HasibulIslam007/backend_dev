import type { Request,Response,NextFunction } from "express";

import type { AnyZodObject } from "zod/v3";


export const validateRequest = (ZodSchema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = ZodSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
}