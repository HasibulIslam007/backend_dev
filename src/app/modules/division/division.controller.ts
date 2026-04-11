
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import type { Request, Response } from "express";
import { DivisionService } from "./division.service.js";
import AppError from "../../errorHelper/AppError.js";
import type { IDivision } from "./division.interface.js";


const createDivision = catchAsync(async(req:Request, res:Response) => {


    const payload: IDivision = {
        ...req.body,
        thumbnail: req.file?.path || "",
    };

    if (typeof req.body?.data === "string") {
        try {
            Object.assign(payload, JSON.parse(req.body.data));
        } catch {
            throw new AppError(400, "Invalid JSON format in data field");
        }
    }

    if (req.file?.path && !payload.thumbnail) {
        payload.thumbnail = req.file.path;
    }

    if (!payload.name) {
        throw new AppError(400, "Division name is required");
    }

    const result = await DivisionService.createDivision(payload as IDivision);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Division created successfully",
        data : result
    })




});

const getAllDivisions = catchAsync(async(req:Request, res:Response) => {

    const result = await DivisionService.getAllDivisions();

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Divisions retrieved successfully",
        data : result
    })

});

const getSingleDivision = catchAsync(async(req:Request, res:Response) => {

    const { slug } = req.params;

    const result = await DivisionService.getSingleDivision(slug as string);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Division retrieved successfully",
        data : result
    })

});

const updateDivision = catchAsync(async(req:Request, res:Response) => {

    const { id } = req.params;

    const result = await DivisionService.updateDivision(id as string, req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Division updated successfully",
        data : result
    })

});

const deleteDivision = catchAsync(async(req:Request, res:Response) => {

    const { id } = req.params;

    const result = await DivisionService.deleteDivision(id as string);

    sendResponse(res, {
        statusCode : 200,   
        success : true,
        message : "Division deleted successfully",
        data : result
    })

});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};

