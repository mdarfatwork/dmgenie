"use server";

import { actionClient } from "@/lib/safe-action";
import { addJobSchema, deleteJobSchema, editJobSchema } from "@/lib/zod-schema";
import { db } from "@/db";
import { jobs } from "@/schema/job";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const addJob = actionClient
  .inputSchema(addJobSchema)
  .action(async ({ parsedInput: { companyName, jobRole, jobDescription } }) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const insertedJob = await db
      .insert(jobs)
      .values({
        userId,
        companyName,
        jobRole,
        jobDescription,
      })
      .returning()
      .then((res) => res[0]);

    if (!insertedJob?.id) {
      throw new Error("Failed to create job");
    }

    return insertedJob;
  });

export const editJob = actionClient
  .inputSchema(editJobSchema)
  .action(
    async ({ parsedInput: { id, companyName, jobRole, jobDescription } }) => {
      const { userId } = await auth();
      if (!userId) throw new Error("User not authenticated");

      const jobToUpdate = await db.query.jobs.findFirst({
        where: (jobs, { eq }) => eq(jobs.id, id),
      });

      if (!jobToUpdate) throw new Error("Job not found");
      if (jobToUpdate.userId !== userId) throw new Error("Unauthorized");

      const updatedJob = await db
        .update(jobs)
        .set({ companyName, jobRole, jobDescription })
        .where(eq(jobs.id, id))
        .returning()
        .then((res) => res[0]);

      if (!updatedJob) throw new Error("Failed to update job");

      return updatedJob;
    }
  );

export const deleteJob = actionClient
  .inputSchema(deleteJobSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const jobToDelete = await db.query.jobs.findFirst({
      where: (jobs, { eq }) => eq(jobs.id, id),
    });

    if (!jobToDelete) throw new Error("Job not found");
    if (jobToDelete.userId !== userId) throw new Error("Unauthorized");

    await db.delete(jobs).where(eq(jobs.id, id));

    return { success: true };
  });
