import type { ITour, ITourType } from "./tour.interface.js";
export declare const TourType: import("mongoose").Model<ITourType, {}, {}, {}, import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ITourType>;
export declare const Tour: import("mongoose").Model<ITour, {}, {}, {}, import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ITour>;
//# sourceMappingURL=tour.model.d.ts.map