import type { Request, Response } from "express";
import { TourService } from "./tour.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import type { ITour } from "./tour.interface.js";
import AppError from "../../errorHelper/AppError.js";

const createTour = async (req: Request, res: Response) => {
    const bodyPayload: Partial<ITour> = { ...req.body };

    if (typeof req.body?.data === "string") {
        try {
            Object.assign(bodyPayload, JSON.parse(req.body.data));
        } catch {
            throw new AppError(400, "Invalid JSON format in data field");
        }
    }

    const uploadedFiles = Array.isArray(req.files) ? req.files : [];
    const uploadedImagePaths = uploadedFiles
        .map((file) => file.path)
        .filter((path): path is string => Boolean(path));

    const payload: ITour = {
        ...(bodyPayload as ITour),
        ...(uploadedImagePaths.length ? { images: uploadedImagePaths } : {}),
    };

    const result = await TourService.createTour(payload);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour created successfully",
        data : result
    })

};

const getAllTours = async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TourService.getAllTours(query as Record<string, string>);
    
    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tours retrieved successfully",
        data : result.data,
        meta : { total: result.meta.totalDocuments }
    })  


};

const UpdateTour = async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await TourService.updateTour(id as string, req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour updated successfully",
        data : result
    })

};

const deleteTour = async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await TourService.deleteTour(id as string);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour deleted successfully",
        data : result
    })

};

const createTourType = async (req: Request, res: Response) => {

    const { name } = req.body;
    const result = await TourService.createTourType(name);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour type created successfully",
        data : result
    })


};

const getAllTourTypes = async (req: Request, res: Response) => {

    const result = await TourService.getAllTourTypes();

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour types retrieved successfully",
        data : result
    })

};

const updateTourType = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name } = req.body;

    const result = await TourService.updateTourType(id as string, { name });

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour type updated successfully",
        data : result
    })

};

const deleteTourType = async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await TourService.deleteTourType(id as string);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour type deleted successfully",
        data : result
    })

};  

export const TourController = {
    createTour,
    getAllTours,
    UpdateTour,
    deleteTour,
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType
};  
