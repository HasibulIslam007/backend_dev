import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";

import { UserService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const verifiedToken = req.user as JwtPayload;

  const payload = req.body;

  const user = await UserService.updateUser(
    userId,
    payload,
    verifiedToken
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUserService();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All users retrieved successfully",
    data: users.data,
    meta: users.meta,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};