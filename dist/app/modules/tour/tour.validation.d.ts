import { z } from "zod";
export declare const createTourZodSchema: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    location: z.ZodOptional<z.ZodString>;
    costFrom: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    included: z.ZodOptional<z.ZodArray<z.ZodString>>;
    excluded: z.ZodOptional<z.ZodArray<z.ZodString>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tourPlan: z.ZodOptional<z.ZodArray<z.ZodString>>;
    maxGuests: z.ZodOptional<z.ZodNumber>;
    minAge: z.ZodOptional<z.ZodNumber>;
    division: z.ZodString;
    tourTypes: z.ZodArray<z.ZodString>;
}, z.core.$strip>>;
export declare const updateTourZodSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    location: z.ZodOptional<z.ZodString>;
    costFrom: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    included: z.ZodOptional<z.ZodArray<z.ZodString>>;
    excluded: z.ZodOptional<z.ZodArray<z.ZodString>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tourPlan: z.ZodOptional<z.ZodArray<z.ZodString>>;
    maxGuests: z.ZodOptional<z.ZodNumber>;
    minAge: z.ZodOptional<z.ZodNumber>;
    division: z.ZodOptional<z.ZodString>;
    tourTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const createTourTypeZodSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=tour.validation.d.ts.map