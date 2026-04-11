import type { Response } from "express";

interface TMEta {
    total : number;
    limit?: number;
    page?: number;
    totalPages?: number;

}

interface TMResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
    meta?: TMEta;
}

export const sendResponse = <T>(res: Response, data:TMResponse<T>) => {

    res.status(data.statusCode || 200).json({
        statusCode: data.statusCode || 200,
        meta: data.meta,
        success: data.success,
        message: data.message,
        data: data.data
    })
}