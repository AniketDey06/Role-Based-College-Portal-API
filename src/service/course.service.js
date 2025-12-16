import { eq } from "drizzle-orm";
import db from '../db/index.js'
import { courseTable } from '../models/course.models.js'

export async function createNewCourse({ adminId, facultyId, courseName }) {
    const [result] = await db
        .insert(courseTable)
        .values({
            adminId,
            facultyId,
            courseName,
        })
        .returning()

    return result
}