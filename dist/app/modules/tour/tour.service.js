import { Tour, TourType } from "./tour.model.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
const createTour = async (payload) => {
    const exitingTour = await Tour.findOne({ title: payload.title });
    if (exitingTour) {
        throw new Error("Tour already exists");
    }
    const tour = await Tour.create(payload);
    return tour;
};
const getAllTours = async (query) => {
    const queryBuilder = new QueryBuilder(Tour.find(), query);
    const tours = await queryBuilder.build().exec();
    const [data, meta] = await Promise.all([
        Promise.resolve(tours),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const updateTour = async (id, payload) => {
    const exitingTour = await Tour.findById(id);
    if (!exitingTour) {
        throw new Error("Tour not found");
    }
    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });
    return updatedTour;
};
const deleteTour = async (id) => {
    return await Tour.findByIdAndDelete(id);
};
const createTourType = async (name) => {
    const existingTourType = await TourType.findOne({ name });
    if (existingTourType) {
        throw new Error("Tour type already exists");
    }
    return await TourType.create({ name });
};
const getAllTourTypes = async () => {
    return await TourType.find();
};
const updateTourType = async (id, payload) => {
    const exitingTourType = await TourType.findById(id);
    if (!exitingTourType) {
        throw new Error("Tour type not found");
    }
    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};
const deleteTourType = async (id) => {
    return await TourType.findByIdAndDelete(id);
};
export const TourService = {
    createTour,
    createTourType,
    updateTour,
    deleteTour,
    getAllTourTypes,
    updateTourType,
    deleteTourType,
    getAllTours
};
//# sourceMappingURL=tour.service.js.map