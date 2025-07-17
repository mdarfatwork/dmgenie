"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { addJobSchema } from "@/lib/zod-schema";
import { db } from "@/db";
import { jobs } from "@/schema/job";
import { auth } from "@clerk/nextjs/server";

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

    revalidatePath(`/job/${insertedJob.id}`);
    return insertedJob;
  });
