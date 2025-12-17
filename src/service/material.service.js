import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { courseMaterialTable } from "../models/materials.models.js";
import { courseTable } from "../models/course.models.js";

export async function addNewMaterial({ courseId, facultyId, title, description, fileUrl }) {
    const [result] = await db
        .insert(courseMaterialTable)
        .values({
            courseId,
            facultyId,
            title,
            description,
            fileUrl
        })
        .returning()

    return result
}

export async function getMaterialsByCourseId(courseId) {
    const result = await db
        .select({
            id: courseMaterialTable.id,
            name: courseTable.courseName,
            title: courseMaterialTable.title,
            description: courseMaterialTable.description,
            fileUrl: courseMaterialTable.fileUrl,
        })
        .from(courseMaterialTable)
        .innerJoin(courseTable, eq(courseTable.id, courseMaterialTable.courseId))
        .where(eq(courseMaterialTable.courseId, courseId))

    return result
}