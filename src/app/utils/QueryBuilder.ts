/* eslint-disable @typescript-eslint/no-dynamic-delete */



import { Query } from 'mongoose';
import { excludeFields } from "../constants.js";

export class QueryBuilder<T>{
    public modelQeury: Query<T[], T>;
    public  readonly query: Record<string, string>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQeury = modelQuery;
        this.query = query;
    }

    filter(): this {
        const filter = { ...this.query };

        for(const field  of excludeFields) {
            delete filter[field];
        }
        this.modelQeury = this.modelQeury.find(filter);

        return this;        

        
    }
    search(searchableFields: string[]): this {
        const searchTerm  = this.query.searchTerm || "";
    

        const searchQuery = searchableFields.map(field => ({
            [field]: {
                $regex: searchTerm,
                $options: "i"
            }
        }))

        this.modelQeury = this.modelQeury.find({ $or: searchQuery });

        return this;
    }

    sort(): this {
        const sort = this.query.fields?.split(",").join(" ") || '';
        this.modelQeury = this.modelQeury.select(sort);
        return this;
    }
    
    paginate(): this {

        const page = parseInt(this.query.page || "1") || 1;
        const limit = parseInt(this.query.limit || "10") || 10;
        const skip = (page - 1) * limit;

        this.modelQeury = this.modelQeury.skip(skip).limit(limit);

        return this;
    }

    build(): Query<T[], T> {
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
        }
    }








}

