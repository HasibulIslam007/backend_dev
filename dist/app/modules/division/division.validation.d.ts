import { z } from "zod";
export declare const createDivisionValidation: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export declare const updateDivisionValidation: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=division.validation.d.ts.map