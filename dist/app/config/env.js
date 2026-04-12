import dotenv from "dotenv";
import process from "process";
dotenv.config();
const loadEnvVariables = () => {
    const requiredEnvVariables = ["DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRET", "FRONTEND_URL", "SSL_STORE_ID", "SSL_STORE_PASSWORD", "SSL_PAYMENT_API", "SSL_VALIDATION_API", "SSL_SUCCESS_FRONTEND_URL", "SSL_FAIL_FRONTEND_URL", "SSL_CANCEL_FRONTEND_URL", "SSL_SUCCESS_BACKEND_URL", "SSL_FAIL_BACKEND_URL", "SSL_CANCEL_BACKEND_URL", "SSL_IPN_URL", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`);
        }
    });
    const config = {
        PORT: process.env.PORT || "5000",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        SSL_STORE_ID: process.env.SSL_STORE_ID,
        SSL_STORE_PASSWORD: process.env.SSL_STORE_PASSWORD,
        SSL_PAYMENT_API: process.env.SSL_PAYMENT_API,
        SSL_VALIDATION_API: process.env.SSL_VALIDATION_API,
        SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL,
        SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL,
        SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL,
        SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL,
        SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL,
        SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL,
        SSL_IPN_URL: process.env.SSL_IPN_URL,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        EMAIL_SENDER: {
            SMTP_HOST: process.env.SMTP_HOST,
            SMTP_PORT: parseInt(process.env.SMTP_PORT),
            SMTP_USER: process.env.SMTP_USER,
            SMTP_PASS: process.env.SMTP_PASS,
            SMTP_FROM: process.env.SMTP_FROM
        },
    };
    if (process.env.REDIS_HOST) {
        config.REDIS_HOST = process.env.REDIS_HOST;
    }
    if (process.env.REDIS_PORT) {
        config.REDIS_PORT = parseInt(process.env.REDIS_PORT, 10);
    }
    if (process.env.REDIS_PASSWORD) {
        config.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
    }
    if (process.env.REDIS_USERNAME) {
        config.REDIS_USERNAME = process.env.REDIS_USERNAME;
    }
    return config;
};
export const envVars = loadEnvVariables();
//# sourceMappingURL=env.js.map