import { createNewResult } from "../service/result.service.js";
import { getUserById } from "../service/user.service.js";
import { UserRoleEnum } from "../utils/constants.js";
import { createResultPostRequstBodySchema } from "../validations/request.validation.js"

export const createResult = async (req, res) => {
    const validateResult = await createResultPostRequstBodySchema.safeParseAsync(req.body)
    if (!validateResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { studentId, fullMarks, obtainedMarks } = validateResult.data
    const adminId = req.user.id

    const student = await getUserById(studentId)
    if (student.role !== UserRoleEnum.STUDENT) {
        return res.status(400).json({ message: `User shoud be STUDENT to get marks.` });
    }

    const result = await createNewResult({adminId, studentId, fullMarks, obtainedMarks})
    if (!result) {
        return res.status(400).json({ message: `something want wrong` });
    }

    return res.status(201).json({data: { ...result}})
}