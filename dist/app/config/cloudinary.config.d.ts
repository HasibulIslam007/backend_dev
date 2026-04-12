import { v2 as Cloudinary, type UploadApiResponse } from "cloudinary";
export declare const uploadBufferToCloudinary: (buffer: Buffer, fileName: string) => Promise<UploadApiResponse | undefined>;
export declare const deleteImageFromCLoudinary: (url: string) => Promise<void>;
export declare const cloudinaryUpload: typeof Cloudinary;
//# sourceMappingURL=cloudinary.config.d.ts.map