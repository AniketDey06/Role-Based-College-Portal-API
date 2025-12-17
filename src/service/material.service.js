import db from "../db/index.js";
import { courseMaterialTable } from "../models/materials.models.js";

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