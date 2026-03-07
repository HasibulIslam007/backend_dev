
import type { Request, Response} from "express";

import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";

import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";




const createUser = catchAsync(async(req: Request, res: Response) => {
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User created successfully",
        data: user
        });
});

const getAllUsers = catchAsync(async(req: Request, res: Response) => {
    const users = await UserService.getAllUserService();
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
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