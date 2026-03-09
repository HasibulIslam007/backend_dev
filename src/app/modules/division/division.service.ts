import type { IDivision } from "./division.interface.js";
import { Division } from "./division.model.js";


const createDivision = async (payload: IDivision) => {

    const exitingDivision = await Division.findOne({ name: payload.name });

    if (exitingDivision) {
        throw new Error("Division already exists");
    }
    const division = await Division.create(payload);

    return division;
}

const getAllDivisions = async () => {
    const divisions = await Division.find();
    const totalDivisions = await Division.countDocuments();
    return {
        divisions,
        totalDivisions
    }
}

const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    if (!division) {
        throw new Error("Division not found");
    }
    return division;
}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedDivision) {
        throw new Error("Division not found");
    }
    return updatedDivision;
}

const deleteDivision = async (id: string) => {
    const deletedDivision = await Division.findByIdAndDelete(id);
    if (!deletedDivision) {
        throw new Error("Division not found");
    }
    return deletedDivision;
}



export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
};  