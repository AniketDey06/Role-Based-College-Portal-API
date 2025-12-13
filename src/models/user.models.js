import { pgTable, text, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { AvailableUserRoles, UserRoleEnum } from '../utils/constants.js'

const userRoleEnum = pgEnum('role', AvailableUserRoles)

export const userTable = pgTable('userTable', {
    id: uuid().primaryKey().defaultRandom(),

    name: varchar('name', { length: 55 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    salt: text().notNull(),
    role: userRoleEnum('role').notNull().default(UserRoleEnum.STUDENT),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})