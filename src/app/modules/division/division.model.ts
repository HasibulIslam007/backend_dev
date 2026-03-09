
import { Schema, model } from "mongoose";
import type { IDivision } from "./division.interface.js";


const divisionSchema = new Schema<IDivision>({
    name : {
        type : String,
        required : true,
        unique : true
    },
    slug:{
        type : String,
        unique : true,
    },
    thumbnail : {
        type : String,
    },
    description : {
        type : String,
    },

},
    {
        timestamps : true,
    });


divisionSchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let count = 1;

        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        this.slug = slug;
    }
    next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {
    const division = this.getUpdate() as Partial<IDivision>;

    if (division.name) {
        const baseSlug = division.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let count = 1;

        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        division.slug = slug;
    }
    this.setUpdate(division);
    next();
})
export const Division = model<IDivision>("Division", divisionSchema);