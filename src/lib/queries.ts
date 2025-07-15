"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { profiles } from "@/schema/profile";
import { eq } from "drizzle-orm";

export async function getProfileByUserId() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .then((res) => res[0]);

    return profile;
  } catch (error) {
    console.error("Error checking user profile existence:", error);
    return null;
  }
}

export type ProfileData = Awaited<ReturnType<typeof getProfileByUserId>>;
