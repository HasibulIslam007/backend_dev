/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from 'mongoose';
import { excludeFields } from "../constants.js";
export class QueryBuilder {
    modelQeury;
    query;
    constructor(modelQuery, query) {
        this.modelQeury = modelQuery;
        this.query = query;
    }
    filter() {
        const filter = { ...this.query };
        for (const field of excludeFields) {
            delete filter[field];
        }
        this.modelQeury = this.modelQeury.find(filter);
        return this;
    }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = searchableFields.map(field => ({
            [field]: {
                $regex: searchTerm,
                $options: "i"
            }
        }));
        this.modelQeury = this.modelQeury.find({ $or: searchQuery });
        return this;
    }
    sort() {
        const sort = this.query.fields?.split(",").join(" ") || '';
        this.modelQeury = this.modelQeury.select(sort);
        return this;
    }
    paginate() {
        const page = parseInt(this.query.page || "1") || 1;
        const limit = parseInt(this.query.limit || "10") || 10;
        const skip = (page - 1) * limit;
        this.modelQeury = this.modelQeury.skip(skip).limit(limit);
        return this;
    }
    build() {
        return this.modelQeury;
    }
    async getMeta() {
        const totalDocuments = await this.modelQeury.clone().countDocuments();
        const page = parseInt(this.query.page || "1") || 1;
        const limit = parseInt(this.query.limit || "10") || 10;
        const totalPages = Math.ceil(totalDocuments / limit);
        return {
            totalDocuments,
            page,
            limit,
            totalPages
        };
    }
}
//# sourceMappingURL=QueryBuilder.js.map