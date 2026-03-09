

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

tourSchema.pre("save", async function(next) {
    if (this.isModified("title")) {
        const baseSlug = this.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let count = 1;

        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${count++}`;
            
        }

        this.slug = slug;
    }
    next();
})

tourSchema.pre("findOneAndUpdate", async function(next) {
    const tour = this.getUpdate() as Partial<ITour>;

    if (tour.title) {
        const baseSlug = tour.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let count = 1;

        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${count++}`;
          
        }

        tour.slug = slug;
    }
    this.setUpdate(tour);
    next();
})

export const Tour = model<ITour>("Tour", tourSchema);