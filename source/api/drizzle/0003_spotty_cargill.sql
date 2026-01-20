/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'account'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "account" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'document'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "document" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'document_version'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "document_version" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "document_version" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "document_version" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'project'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "project" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'session'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "session" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'subscription'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "subscription" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'user'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "user" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'verification'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "verification" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "document_version" ADD CONSTRAINT "document_version_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "verification" ADD CONSTRAINT "verification_id_unique" UNIQUE("id");