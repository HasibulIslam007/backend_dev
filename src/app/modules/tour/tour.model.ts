

import { Schema, model } from "mongoose";
import type { ITour, ITourType } from "./tour.interface.js";


const tourTypesSchema = new Schema<ITourType>({

    name: {
        type: String,
        required: true,
        unique: true
    }

}, {
    timestamps : true
})

export const TourType = model<ITourType>("TourType", tourTypesSchema);



const tourSchema = new Schema<ITour>({

    title : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        unique : true,
        required : true,
    },
    description : {
        type : String,
    },
    images : [{
        type : String, default : [] 
    }],
    location : {
        type : String,
    },
    costFrom : {
        type : Number,
    },
    startDate : {
        type : Date,
    },
    endDate : {
        type : Date,
    },
    included : [{
        type : String, default : []
    }],
    excluded : [{
        type : String, default : []
    }],
    amenities : [{
        type : String, default : []
    }],
    tourPlan : [{
        type : String, default : []
    }],
    maxGuests : {
        type : Number,
    },
    minAge : {
        type : Number,
    },
    division : {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourTypes: [{
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }],



},{
    timestamps: true
})

const buildUniqueSlug = async (title: string, excludeId?: unknown) => {
    const baseSlug = title.trim().toLowerCase().split(/\s+/).join("-");
    let slug = baseSlug;
    let count = 1;
    const query: Record<string, unknown> = { slug };
    if (excludeId) {
        query._id = { $ne: excludeId };
    }

    while (await Tour.exists(query)) {
        slug = `${baseSlug}-${count++}`;
        query.slug = slug;
    }

    return slug;
};

tourSchema.pre("validate", async function() {
    if (this.isModified("title") && this.title) {
        const excludeId = this.isNew ? undefined : this._id;
        this.slug = await buildUniqueSlug(this.title, excludeId);
    }
})

tourSchema.pre("findOneAndUpdate", async function() {
    const tour = this.getUpdate() as Partial<ITour>;

    if (tour.title) {
        const query = this.getQuery() as { _id?: unknown };
        tour.slug = await buildUniqueSlug(tour.title, query?._id);
    }
    this.setUpdate(tour);
})

export const Tour = model<ITour>("Tour", tourSchema);
