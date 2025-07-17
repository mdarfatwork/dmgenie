import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profiles } from "./profile";

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey().$default(createId).unique().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => profiles.userId, { onDelete: "cascade" }),
  companyName: text("company_name").notNull(),
  jobRole: text("job_role").notNull(),
  jobDescription: text("job_description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  profile: one(profiles, {
    fields: [jobs.userId],
    references: [profiles.userId],
  }),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  jobs: many(jobs),
}));

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;