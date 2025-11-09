CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task` text NOT NULL,
	`hours` integer NOT NULL,
	`minutes` integer NOT NULL
);
