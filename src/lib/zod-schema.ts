import { z } from "zod";

export const createProfileSchema = z.object({
  clerkId: z.string(),
  email: z.email(),
  aboutMe: z.string(),
});

export const addJobSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  jobRole: z.string().min(2, {
    message: "Job role must be at least 2 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
});

export const editJobSchema = z.object({
  id: z.cuid2(),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  jobRole: z.string().min(2, {
    message: "Job role must be at least 2 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
});

export const deleteJobSchema = z.object({
  id: z.cuid2(),
});

export type CreateProfileSchemaType = z.infer<typeof createProfileSchema>;
export type AddJobSchemaType = z.infer<typeof addJobSchema>;
export type EditJobSchemaType = z.infer<typeof editJobSchema>;
export type DeleteJobSchemaType = z.infer<typeof deleteJobSchema>;
