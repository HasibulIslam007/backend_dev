import type { Types } from "mongoose";

 
export enum UserRole {
    ADMIN       = "ADMIN",
    GUIDE       = "GUIDE",
    USER        = "USER",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export interface AutuhenticatedUser {
    provider: "google" | "credentials" ;
    providerId: string;

}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}


export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role?: UserRole;
    
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];
    auths?: AutuhenticatedUser[];

}