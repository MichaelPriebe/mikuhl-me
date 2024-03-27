CREATE TABLE `links` (
	`slug` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`clicks` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `public_link_entries` (
	`id` integer PRIMARY KEY NOT NULL,
	`link_id` integer NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	FOREIGN KEY (`link_id`) REFERENCES `public_links`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`slug`) REFERENCES `links`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `public_links` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`fill` text NOT NULL,
	`background` text NOT NULL,
	`path` text NOT NULL
);
