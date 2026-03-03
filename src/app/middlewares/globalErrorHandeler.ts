import AppError from "../errorHelper/AppError.js";
import { envVars } from "../modules/config/env.js";
import { StatusCodes } from "http-status-codes";


import type { NextFunction, Request, Response } from "express";  // 👈 use type-only impor
// t

export const globalErrorHandler = (err: any, req: Request, res : Response, next:NextFunction) =>{

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