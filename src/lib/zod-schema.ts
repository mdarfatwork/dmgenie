import { z } from "zod";

export const createProfileSchema = z.object({
  clerkId: z.string(),
  email: z.email(),
  aboutMe: z.string(),
});

export type CreateProfileSchemaType = z.infer<typeof createProfileSchema>;
