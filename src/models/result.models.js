import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { userTable } from './user.models.js'

export const resultTable = pgTable('resultTable', {
    id: uuid().primaryKey().defaultRandom(),

    adminId: uuid("admin_id").references(() => userTable.id).notNull(),
    studentId: uuid("student_id").references(() => userTable.id).notNull(),

    fullMarks: varchar().notNull(),
    obtainedMarks: varchar().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})