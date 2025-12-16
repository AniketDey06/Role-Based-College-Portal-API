import { createResultPostRequstBodySchema } from "../validations/request.validation.js"
import { createNewResult, getResultById } from "../service/result.service.js";
import { getUserById } from "../service/user.service.js";
import { UserRoleEnum } from "../utils/constants.js";

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

    const result = await createNewResult({ adminId, studentId, fullMarks, obtainedMarks })
    if (!result) {
        return res.status(400).json({ message: `something want wrong` });
    }

    return res.status(201).json({ data: { ...result } })
}

export const getResult = async (req, res) => {
    const userId = req.user.id
    const studentId = req.params.studentId
    if (!userId) {
        return res.status(400).json({ message: `User have to loged in` });
    }

    if (!studentId) {
        return res.status(400).json({ message: `Student ID must be their in the params` });
    }

    const user = await getUserById(userId)

    if (user.role === UserRoleEnum.STUDENT && user.id !== studentId) {
        return res.status(403).json({
            error: "You are not ADMIN so you are not allowed to view other student's results"
        });
    }

    const resultData = await getResultById(studentId)
    if (!resultData) {
        return res.status(403).json({
            error: "No results found"
        });
    }

    return res.status(201).json({ data: { ...resultData } })
}