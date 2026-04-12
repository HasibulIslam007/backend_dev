import { z } from "zod";
export declare const verifyEmailZodSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strip>;
export declare const resendVerificationZodSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map