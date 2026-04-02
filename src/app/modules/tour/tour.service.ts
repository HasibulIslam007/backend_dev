
import type { ITour, ITourType } from "./tour.interface.js";
import { Tour, TourType } from "./tour.model.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";



const createTour = async (payload: ITour) =>{
    const exitingTour = await Tour.findOne({ title: payload.title });

    if (exitingTour) {
        throw new Error("Tour already exists");
    }
    const tour = await Tour.create(payload);

    return tour;    

}

const getAllTours = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder.build().exec();

    const [data, meta ] = await Promise.all([
        Promise.resolve(tours),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }   



}



const updateTour = async (id: string, payload: Partial<ITour>) => {
    const exitingTour = await Tour.findById(id);

    if (!exitingTour) {
        throw new Error("Tour not found");
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
}

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
}

const getAllTourTypes = async () => {
    return await TourType.find();
}

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
    const exitingTourType = await TourType.findById(id);

    if (!exitingTourType) {
        throw new Error("Tour type not found");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });

    return updatedTourType;
}

const deleteTourType = async (id: string) => {
    return await TourType.findByIdAndDelete(id);
}

export const TourService = {
    createTour,
    updateTour,
    deleteTour,
    getAllTourTypes,
    updateTourType,
    deleteTourType,
    getAllTours
};
