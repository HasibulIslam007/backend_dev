import { Division } from "./division.model.js";
import { isValidObjectId } from "mongoose";
const createDivision = async (payload) => {
    const exitingDivision = await Division.findOne({ name: payload.name });
    if (exitingDivision) {
        throw new Error("Division already exists");
    }
    const division = await Division.create(payload);
    return division;
};
const getAllDivisions = async () => {
    const divisions = await Division.find();
    const totalDivisions = await Division.countDocuments();
    return {
        divisions,
        totalDivisions
    };
};
const getSingleDivision = async (slug) => {
    const normalizedSlug = slug.trim().toLowerCase();
    let division = await Division.findOne({ slug: normalizedSlug });
    if (!division && isValidObjectId(slug)) {
        division = await Division.findById(slug);
    }
    if (!division) {
        throw new Error("Division not found");
    }
    return division;
};
const updateDivision = async (id, payload) => {
    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedDivision) {
        throw new Error("Division not found");
    }
    return updatedDivision;
};
const deleteDivision = async (id) => {
    const deletedDivision = await Division.findByIdAndDelete(id);
    if (!deletedDivision) {
        throw new Error("Division not found");
    }
    return deletedDivision;
};
export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
};
//# sourceMappingURL=division.service.js.map