CREATE TABLE "profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"about_me" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company_name" text NOT NULL,
	"job_role" text NOT NULL,
	"job_description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jobs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE cascade ON UPDATE no action;