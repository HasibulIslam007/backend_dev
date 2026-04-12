import { Schema, model } from "mongoose";
const divisionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});
divisionSchema.pre("save", async function () {
    if (this.isModified("name")) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let count = 1;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }
        this.slug = slug;
    }
});
divisionSchema.pre("findOneAndUpdate", async function () {
    const division = this.getUpdate();
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
});
export const Division = model("Division", divisionSchema);
//# sourceMappingURL=division.model.js.map