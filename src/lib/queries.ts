"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { profiles } from "@/schema/profile";
import { jobs } from "@/schema/job";
import { and, desc, eq } from "drizzle-orm";

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

export async function getJobsByUserId() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const userJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.userId, userId))
      .orderBy(desc(jobs.createdAt));

    return userJobs;
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    return [];
  }
}

export async function getJobById(jobId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const job = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
      .then((res) => res[0]);

    return job || null;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
}

export type ProfileData = Awaited<ReturnType<typeof getProfileByUserId>>;
export type JobsData = Awaited<ReturnType<typeof getJobsByUserId>>;
export type JobData = Awaited<ReturnType<typeof getJobById>>;
