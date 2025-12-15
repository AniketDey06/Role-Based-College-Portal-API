import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { resultTable } from "../models/index.js";

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