CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" varchar,
	"senderId" uuid,
	"recieverId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" time
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" varchar(255),
	"email" varchar,
	"clerkId" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" time,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "post_tags" CASCADE;--> statement-breakpoint
DROP TABLE "posts" CASCADE;--> statement-breakpoint
DROP TABLE "tags" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_recieverId_users_id_fk" FOREIGN KEY ("recieverId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;