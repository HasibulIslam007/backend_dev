import dotenv from "dotenv";

dotenv.config();


interface EnvVars {
    PORT: string | number;
    DB_URL: string;
    NODE_ENV: string;
}

export const envVars: EnvVars = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "",
    NODE_ENV: process.env.NODE_ENV || "development",
};