import { pgTable, text, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { userRoleEnum } from '../utils/constants.js'


export const userTable = pgTable('userTable', {
    id: uuid().primaryKey().defaultRandom(),

    name: varchar('name', { length: 55 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    role: userRoleEnum('role').notNull().default('STUDENT'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})
