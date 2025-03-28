CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`estado` text NOT NULL,
	`cidade` text NOT NULL,
	`habitantes` integer NOT NULL,
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_cidade_unique` ON `user` (`cidade`);