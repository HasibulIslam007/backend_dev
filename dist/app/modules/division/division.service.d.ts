import type { IDivision } from "./division.interface.js";
export declare const DivisionService: {
    createDivision: (payload: IDivision) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllDivisions: () => Promise<{
        divisions: (import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalDivisions: number;
    }>;
    getSingleDivision: (slug: string) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateDivision: (id: string, payload: Partial<IDivision>) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteDivision: (id: string) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=division.service.d.ts.map