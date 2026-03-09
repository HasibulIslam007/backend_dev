import {z} from "zod";

export const createTourZodSchema = z.object({
    title : z.string().min(2).max(100),
    slug : z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    images : z.array(z.string().url()).optional(),
    location : z.string().optional(),
    costFrom : z.number().positive().optional(),
    startDate : z.date().optional(),
    endDate : z.date().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuests: z.number().positive().optional(),
    minAge: z.number().positive().optional(),
    division : z.string(), // Assuming this will be an ID, you might want to validate it as an ObjectId
    tourTypes: z.string(), // Assuming this will be an ID, you might want to validate it as an ObjectId
});

export const updateTourZodSchema = z.object({
    title : z.string().min(2).max(100).optional(),
    slug : z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(500).optional(),
    images : z.array(z.string().url()).optional(),
    location : z.string().optional(),
    costFrom : z.number().positive().optional(),
    startDate : z.date().optional(),
    endDate : z.date().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuests: z.number().positive().optional(),
    minAge: z.number().positive().optional(),
    division : z.string().optional(), // Assuming this will be an ID, you might want to validate it as an ObjectId
    tourTypes: z.string().optional(), // Assuming this will be an ID, you might want to validate it as an ObjectId
})  

export const createTourTypeZodSchema = z.object({
    name: z.string().min(2).max(100),
})





    