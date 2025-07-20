import { relations } from "drizzle-orm/relations";
import { profiles, jobs, messages } from "./schema";

export const jobsRelations = relations(jobs, ({one, many}) => ({
	profile: one(profiles, {
		fields: [jobs.userId],
		references: [profiles.userId]
	}),
	messages: many(messages),
}));

export const profilesRelations = relations(profiles, ({many}) => ({
	jobs: many(jobs),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	job: one(jobs, {
		fields: [messages.jobId],
		references: [jobs.id]
	}),
}));