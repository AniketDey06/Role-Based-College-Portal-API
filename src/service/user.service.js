import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { userTable } from "../models/user.models.js";

export async function getUserByEmail(email) {
    const [existingUser] = await db
        .select({
            id: userTable.id,
            name: userTable.name,
            role: userTable.role,
            password: userTable.password,
            salt: userTable.salt
        })
        .from(userTable)
        .where(eq(userTable.email, email))

    return existingUser;
}


export async function createUser({ name, email, password, salt }) {
    const [user] = await db
        .insert(userTable)
        .values({
            name,
            email,
            password,
            salt
        })
        .returning({ id: userTable.id })

    return user
}

export async function getUserById(userId) {
    const [result] = await db
        .select({
            id: userTable.id,
            name: userTable.name,
            role: userTable.role,
        })
        .from(userTable)
        .where(eq(userTable.id, userId))

    return result
}

export async function getAllUsers(params) {
    const result = await db
        .select({
            id: userTable.id,
            name: userTable.name,
            role: userTable.role,
        })
        .from(userTable)

    return result
}