import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { courseTable } from './course.models.js'
import { userTable } from './user.models.js'

export const courseMaterialTable = pgTable('courseMaterialTable', {
    id: uuid().primaryKey().defaultRandom(),

    courseId: uuid().references(() => courseTable.id).notNull(),
    facultyId: uuid().references(() => userTable.id).notNull(),

    title: varchar().notNull(),
    description: varchar(),
    fileUrl: text(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})