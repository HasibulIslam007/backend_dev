
import { v2 as Cloudinary, type UploadApiResponse } from "cloudinary";
import { envVars } from "./env.js";
import AppError from "../errorHelper/AppError.js";
import stream from "stream";


Cloudinary.config({
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET,
})

export const uploadBufferToCloudinary = async (buffer: Buffer, fileName: string): Promise<UploadApiResponse | undefined> => {
    try {
        return new Promise((resolve, reject) => {

            const public_id = `pdf/${fileName}-${Date.now()}`

            const bufferStream = new stream.PassThrough();
            bufferStream.end(buffer)

            Cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: public_id,
                    folder: "pdf"
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result)
                }
            ).end(buffer)


        })

    } catch (error: any) {
        console.log(error);
        throw new AppError(401, `Error uploading file ${error.message}`)
    }
}
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