import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { DivisionService } from "./division.service.js";
import AppError from "../../errorHelper/AppError.js";
const createDivision = catchAsync(async (req, res) => {
    const payload = {
        ...req.body,
        thumbnail: req.file?.path || "",
    };
    if (typeof req.body?.data === "string") {
        try {
            Object.assign(payload, JSON.parse(req.body.data));
        }
        catch {
            throw new AppError(400, "Invalid JSON format in data field");
        }
    }
    if (req.file?.path && !payload.thumbnail) {
        payload.thumbnail = req.file.path;
    }
    if (!payload.name) {
        throw new AppError(400, "Division name is required");
    }
    const result = await DivisionService.createDivision(payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division created successfully",
        data: result
    });
});
const getAllDivisions = catchAsync(async (req, res) => {
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved successfully",
        data: result
    });
});
const getSingleDivision = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division retrieved successfully",
        data: result
    });
});
const updateDivision = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DivisionService.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated successfully",
        data: result
    });
});
const deleteDivision = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DivisionService.deleteDivision(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted successfully",
        data: result
    });
});
export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
//# sourceMappingURL=division.controller.js.map