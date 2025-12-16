import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { resultTable, userTable } from "../models/index.js";

export async function createNewResult({ adminId, studentId, fullMarks, obtainedMarks }) {
    const [result] = await db
        .insert(resultTable)
        .values({
            adminId,
            studentId,
            fullMarks,
            obtainedMarks,
        })
        .returning()

    return result
}

export async function getResultById(studentId) {
    const result = await db
    .select({
        id: userTable.id,
        name: userTable.name,
        role: userTable.role,
        fullMarks: resultTable.fullMarks,
        obtainedMarks: resultTable.obtainedMarks,
    })
    .from(resultTable)
    .innerJoin(userTable, eq(userTable.id, resultTable.studentId))
    .where(eq(resultTable.studentId, studentId))

    return result
}