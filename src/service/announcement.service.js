import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { announcementTable } from "../models/index.js";

export async function createNewAnnouncement({ title, description, userId }) {
    const [result] = await db
        .insert(announcementTable)
        .values({
            userId: userId,
            title,
            description,
        })
        .returning()

    return result
}

export async function getAllAnnouncement() {
    const result = await db
    .select({
        id: announcementTable.id,
        title: announcementTable.title,
        description: announcementTable.description,
    }).from(announcementTable)

    return result
}