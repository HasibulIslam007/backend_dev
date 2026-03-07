import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }


        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}