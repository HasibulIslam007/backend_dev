import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { envVars } from "../config/env.js";
import AppError from "../errorHelper/AppError.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const transporter = nodemailer.createTransport({
    secure: true,
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS
    },
    host: envVars.EMAIL_SENDER.SMTP_HOST,
    port: envVars.EMAIL_SENDER.SMTP_PORT
});
export const sendEmail = async ({ to, subject, templateName, templateData, attachments }) => {
    try {
        const templepath = path.join(__dirname, "templates", `${templateName}.ejs`);
        const html = await ejs.renderFile(templepath, templateData);
        const info = await transporter.sendMail({
            from: envVars.EMAIL_SENDER.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        });
        console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    }
    catch (error) {
        console.log(`\u274C Failed to send email to ${to}:`, error);
        throw new AppError(401, "Failed to send email");
    }
};
//# sourceMappingURL=sendEmail.js.map