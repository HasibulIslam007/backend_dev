
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import type { Request, Response } from "express";
import { DivisionService } from "./division.service.js";


const createDivision = catchAsync(async(req:Request, res:Response) => {

    const result = await DivisionService.createDivision(req.body);

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

