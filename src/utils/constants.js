import { pgEnum } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('role', ['STUDENT', 'FACULTY', 'ADMIN'])