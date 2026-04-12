import { model, Schema } from "mongoose";
import { IsActive, UserRole } from "./user.interface.js";
const authenticatedUserSchema = new Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, { _id: false, versionKey: false });
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
    isVerified: { type: Boolean, default: true },
    role: { type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    auths: [authenticatedUserSchema],
}, {
    timestamps: true,
    versionKey: false,
});
export const User = model("User", userSchema);
//# sourceMappingURL=user.model.js.map