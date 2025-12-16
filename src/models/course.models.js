import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { userTable } from './user.models.js'

export const courseTable = pgTable('courseTable', {
    id: uuid().primaryKey().defaultRandom(),

    adminId: uuid('admin_id').references(() => userTable.id).notNull(),
    facultyId: uuid('faculty_id').references(() => userTable.id).notNull(),

    courseName: varchar({length: 60}).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})