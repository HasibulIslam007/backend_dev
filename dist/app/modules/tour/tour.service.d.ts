import type { ITour, ITourType } from "./tour.interface.js";
export declare const TourService: {
    createTour: (payload: ITour) => Promise<import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createTourType: (name: string) => Promise<import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTour: (id: string, payload: Partial<ITour>) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteTour: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getAllTourTypes: () => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateTourType: (id: string, payload: Partial<ITourType>) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteTourType: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getAllTours: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            totalDocuments: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
};
//# sourceMappingURL=tour.service.d.ts.map