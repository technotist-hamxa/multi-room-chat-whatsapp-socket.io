import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  userName: varchar({ length: 255 }),
  email: varchar().unique(),
  clerkId: varchar(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(), // auto-update timestamp
});

export const messageTable = pgTable("messages", {
  id: uuid().primaryKey().defaultRandom(),
  message: varchar(),
  senderId: uuid().references(() => usersTable.id),
  receiverId: uuid().references(() => usersTable.id), // fixed typo
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(), // auto-update timestamp
});
