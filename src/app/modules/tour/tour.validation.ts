import { z } from "zod";

export const createTourZodSchema = z.preprocess((input) => {
  if (
    input &&
    typeof input === "object" &&
    "data" in input &&
    typeof (input as { data?: unknown }).data === "string"
  ) {
    try {
      return JSON.parse((input as { data: string }).data);
    } catch {
      return input;
    }
  }

  return input;
}, z.object({
  title: z.string().min(2).max(100),

  slug: z.string().min(2).max(100).optional(),

  description: z.string().min(10).max(500),

  images: z.array(z.string().url()).optional(),

  location: z.string().optional(),

  costFrom: z.number().positive().optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  included: z.array(z.string()).optional(),

  excluded: z.array(z.string()).optional(),

  amenities: z.array(z.string()).optional(),

  tourPlan: z.array(z.string()).optional(),

  maxGuests: z.number().positive().optional(),

  minAge: z.number().positive().optional(),

  division: z.string(),

  tourTypes: z.array(z.string())
}));

export const updateTourZodSchema = z.object({
  title: z.string().min(2).max(100).optional(),

  slug: z.string().min(2).max(100).optional(),

  description: z.string().min(10).max(500).optional(),

  images: z.array(z.string().url()).optional(),

  location: z.string().optional(),

  costFrom: z.number().positive().optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  included: z.array(z.string()).optional(),

  excluded: z.array(z.string()).optional(),

  amenities: z.array(z.string()).optional(),

  tourPlan: z.array(z.string()).optional(),

  maxGuests: z.number().positive().optional(),

  minAge: z.number().positive().optional(),

  division: z.string().optional(),

  tourTypes: z.array(z.string()).optional()
});

export const createTourTypeZodSchema = z.object({
  name: z.string().min(2).max(100)
});