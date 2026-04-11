import AppError from "../errorHelper/AppError.js";
import { envVars } from "../config/env.js";

import { deleteImageFromCLoudinary } from "../config/cloudinary.config.js";;


import type { NextFunction, Request, Response } from "express";  // 👈 use type-only impor
// t

export const globalErrorHandler =  async (err: Error, req: Request, res : Response, next:NextFunction) =>{
    if (req.file) {
        await deleteImageFromCLoudinary(req.file.path)
    }

    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)

        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)))
    }
    let statusCode = 500;
    let message =  "Something went wrong";

    if (err instanceof AppError){
        statusCode = err.statusCode;
        message = err.message;
    }else if (err instanceof Error){
        statusCode = 500;
        message = err.message;
    }   

    res.status(statusCode).json({
        success: false,
        message: message,
        error: err,
        stack : envVars.NODE_ENV === "development" ? err.stack : undefined
    })
}
