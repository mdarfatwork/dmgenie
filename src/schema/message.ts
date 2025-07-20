import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { jobs } from "./job";

export const messages = pgTable("messages", {
  id: text("id").primaryKey().$default(createId).unique().notNull(),
  jobId: text("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  employeeName: text("employee_name").notNull(),
  employeeRole: text("employee_role").notNull(),
  messageTone: text("message_tone").notNull(),
  customInstructions: text("custom_instructions"),
  generatedMessage: text("generated_message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  job: one(jobs, {
    fields: [messages.jobId],
    references: [jobs.id],
  }),
}));

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
