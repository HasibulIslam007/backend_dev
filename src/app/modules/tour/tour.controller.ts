import type { Request, Response } from "express";
import { TourService } from "./tour.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createTour =(req: Request, res: Response) => {

    const result = TourService.createTour(req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour created successfully",
        data : result
    })

};

const getAllTours = (req: Request, res: Response) => {
    const query = req.query;
    const result = TourService.getAllTours(query as Record<string, string>);
    
    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tours retrieved successfully",
        data : result
    })  


};

const UpdateTour = (req: Request, res: Response) => {

    const { id } = req.params;

    const result = TourService.updateTour(id as string, req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour updated successfully",
        data : result
    })

};

const deleteTour = (req: Request, res: Response) => {

    const { id } = req.params;

    const result = TourService.deleteTour(id as string);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour deleted successfully",
        data : result
    })

};

const createTourType = (req: Request, res: Response) => {

    const result = TourService.createTourType(name);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour type created successfully",
        data : result
    })


};

const getAllTourTypes = (req: Request, res: Response) => {

    const result = TourService.getAllTourTypes();

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour types retrieved successfully",
        data : result
    })

};

const updateTourType = (req: Request, res: Response) => {

    const { id } = req.params;
    const { name } = req.body;

    const result = TourService.updateTourType(id as string, name);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Tour type updated successfully",
        data : result
    })

};

const deleteTourType = (req: Request, res: Response) => {

    const { id } = req.params;

    const result = TourService.deleteTourType(id as string);

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