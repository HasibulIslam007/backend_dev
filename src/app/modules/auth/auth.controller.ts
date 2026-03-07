
import { AuthService } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import  type {Request , Response} from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";


const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
   

    const loginInfo = await AuthService.credentialsLogin(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Login successful",
        data: loginInfo
    })
},

)

export const AuthController = {
    credentialsLogin
}