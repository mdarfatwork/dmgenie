import { pgTable, text } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  userId: text("user_id").notNull().primaryKey(),
  email: text("email").notNull(),
  aboutMe: text("about_me").notNull(),
});
