import { pgTable, text, foreignKey, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profiles = pgTable("profiles", {
	userId: text("user_id").primaryKey().notNull(),
	email: text().notNull(),
	aboutMe: text("about_me").notNull(),
});

export const jobs = pgTable("jobs", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	companyName: text("company_name").notNull(),
	jobRole: text("job_role").notNull(),
	jobDescription: text("job_description").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.userId],
			name: "jobs_user_id_profiles_user_id_fk"
		}).onDelete("cascade"),
]);

export const messages = pgTable("messages", {
	id: text().primaryKey().notNull(),
	jobId: text("job_id").notNull(),
	employeeName: text("employee_name").notNull(),
	employeeRole: text("employee_role").notNull(),
	messageTone: text("message_tone").notNull(),
	customInstructions: text("custom_instructions"),
	generatedMessage: text("generated_message").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [jobs.id],
			name: "messages_job_id_jobs_id_fk"
		}).onDelete("cascade"),
]);
