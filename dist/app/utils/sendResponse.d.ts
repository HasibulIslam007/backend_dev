import type { Response } from "express";
interface TMEta {
    total: number;
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
export declare const sendResponse: <T>(res: Response, data: TMResponse<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map