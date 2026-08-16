CREATE TABLE `todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL
);
