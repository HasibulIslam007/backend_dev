import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env.js";
import { UserRole } from "./user.interface.js";
import bcryptjs from "bcryptjs";
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    // ✅ Ensure required fields exist
    if (!email) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest,
    });
    return user;
};
const getAllUserService = async () => {
    const users = await User.find({});
    const total = await User.countDocuments();
    return { data: users, meta: { total } };
};
const updateUser = async (userId, payload, decodedToken) => {
    if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
        if (userId !== decodedToken.id) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
        const ifUserExist = await User.findById(userId);
        if (!ifUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
        }
        if (decodedToken.role === UserRole.ADMIN && ifUserExist.role === UserRole.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }
    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     *
     * promoting to superadmin - superadmin
     */
    if (payload.role) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }
    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdatedUser;
};
export const UserService = {
    createUser,
    getAllUserService,
    updateUser
};
//# sourceMappingURL=user.service.js.map