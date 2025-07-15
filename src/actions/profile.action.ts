"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { createProfileSchema } from "@/lib/zod-schema";
import { db } from "@/db";
import { profiles } from "@/schema/profile";
import { eq } from "drizzle-orm";

export const createProfile = actionClient
  .inputSchema(createProfileSchema)
  .action(async ({ parsedInput: { clerkId, email, aboutMe } }) => {
    const existing = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, clerkId))
      .then((res) => res[0]);

    if (existing) {
      // Update existing profile
      await db
        .update(profiles)
        .set({
          email,
          aboutMe,
        })
        .where(eq(profiles.userId, clerkId));
    } else {
      // Insert new profile
      await db.insert(profiles).values({
        userId: clerkId,
        email,
        aboutMe,
      });
    }

    revalidatePath("/profile");
  });
