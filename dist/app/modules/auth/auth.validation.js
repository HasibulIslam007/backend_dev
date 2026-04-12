import { z } from "zod";
export const verifyEmailZodSchema = z.object({
    token: z.string({ error: "Verification token is required" }),
});
export const resendVerificationZodSchema = z.object({
    email: z
        .string({ error: "Email is required" })
        .email({ message: "Invalid email address format." }),
});
//# sourceMappingURL=auth.validation.js.map