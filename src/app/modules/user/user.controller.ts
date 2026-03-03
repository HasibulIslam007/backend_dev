
import type { Request, Response, NextFunction } from "express";
import {User} from "./user.model.js";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { send } from "vite";
import { sendResponse } from "../../utils/sendResponse.js";




const createUser = catchAsync(async(req:Request,res:Response , next:NextFunction )=>{
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User created successfully",
        data: user
        });
});

const getAllUsers = catchAsync(async(req:Request,res:Response , next:NextFunction )=>{
    const users = await UserService.getAllUserService();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message:"All users retrieved successfully",
        data: users.data,
        meta: users.meta
    })
});

export const UserController = {
    createUser,
    getAllUsers
}