
import { v2 as Cloudinary } from "cloudinary";
import { envVars } from "./env.js";
import AppError from "../errorHelper/AppError.js";


Cloudinary.config({
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET,
})


export const deleteImageFromCLoudinary = async (url: string) => {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpjg|jpeg|png|gif|bmp|webp|svg)?/i;
        const match = url.match(regex);

        if (match && match[1]) {
            const publicId = match[1];
            await Cloudinary.uploader.destroy(publicId);
        }
    } catch (error: any) {
        throw new AppError(401, "Failed to delete image from Cloudinary: ",  error.message);
    }
}

export const cloudinaryUpload = Cloudinary;