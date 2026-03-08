
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

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserService.updateUser(userId, payload, verifiedToken)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})
export const UserController = {
    createUser,
    getAllUsers,
    updateUser
}