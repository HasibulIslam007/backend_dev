import { z } from "zod";
export const createDivisionValidation = z.preprocess((input) => {
    if (input &&
        typeof input === "object" &&
        "data" in input &&
        typeof input.data === "string") {
        try {
            return JSON.parse(input.data);
        }
        catch {
            return input;
        }
    }
    return input;
}, z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(100).optional(),
    thumbnail: z.string().url().optional(),
    description: z.string().max(255).optional(),
}));
export const updateDivisionValidation = z.object({
    name: z.string().min(2).max(100).optional(),
    slug: z.string().min(2).max(100).optional(),
    thumbnail: z.string().url().optional(),
    description: z.string().max(255).optional(),
});
//# sourceMappingURL=division.validation.js.map