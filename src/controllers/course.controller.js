import { createNewCourse } from "../service/course.service.js";
import { getUserById } from "../service/user.service.js";
import { UserRoleEnum } from "../utils/constants.js";
import { createCourcePostRequstBodySchema } from "../validations/request.validation.js"

export const createCourse = async (req, res) => {
    const validationResult = await createCourcePostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { facultyId, courseName } = validationResult.data
    const adminId = req.user.id

    const facultyData = await getUserById(facultyId)
    if (facultyData.role !== UserRoleEnum.FACULTY) {
        return res.status(400).json({ message: `This is not be assignable in any course as user is not a 'FACULTY'.` });
    }

    const courseData = await createNewCourse({ adminId, facultyId, courseName })

    return res.status(201).json({ data: { ...courseData } })
}