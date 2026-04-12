import type { IUser } from "../user/user.interface.js";
import type { JwtPayload } from "jsonwebtoken";
import type { AutuhenticatedUser } from "../user/user.interface.js";
export declare const AuthService: {
    credentialsLogin: (payload: Partial<IUser>) => Promise<{
        success: boolean;
        message: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone?: string;
            picture?: string;
            address?: string;
            isDeleted?: boolean;
            isActive?: import("../user/user.interface.js").IsActive;
            isVerified?: boolean;
            role?: import("../user/user.interface.js").UserRole;
            bookings?: import("mongoose").Types.ObjectId[];
            guides?: import("mongoose").Types.ObjectId[];
            auths?: AutuhenticatedUser[];
            createdAt?: Date;
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    resetPassword: (payload: Record<string, any>, decodedToken: JwtPayload) => Promise<void>;
    setPassword: (userId: string, plainPassword: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
    createEmailVerificationToken: (user: Partial<IUser>) => string;
    verifyEmail: (token: string) => Promise<{
        alreadyVerified: boolean;
        verified?: never;
    } | {
        verified: boolean;
        alreadyVerified?: never;
    }>;
    resendVerification: (email: string) => Promise<{
        alreadyVerified: boolean;
        verificationToken?: never;
    } | {
        verificationToken: string;
        alreadyVerified?: never;
    }>;
    forgetPassword: (email: string) => Promise<{
        resetToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map