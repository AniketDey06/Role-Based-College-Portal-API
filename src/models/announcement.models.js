import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { userTable } from "./user.models.js"

export const announcementTable = pgTable('announcementTable', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => userTable.id).notNull(),

    title: text().notNull(),
    description: text().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})
