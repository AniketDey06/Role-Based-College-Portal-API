import {
    addMaterialToCourcePostRequstBodySchema,
    createCourcePostRequstBodySchema
} from "../validations/request.validation.js"

import {
    createNewCourse,
    getAllCourses,
    getCourseById
} from "../service/course.service.js";

import { addNewMaterial, getMaterialsByCourseId } from "../service/material.service.js";
import { getUserById } from "../service/user.service.js";
import { UserRoleEnum } from "../utils/constants.js";

export const createCourse = async (req, res) => {
    const validationResult = await createCourcePostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { facultyId, courseName } = validationResult.data
    const adminId = req.user.id

    const facultyData = await getUserById(facultyId)
    if (facultyData.role !== UserRoleEnum.FACULTY) {
        return res.status(400)
            .json({ message: `This is not be assignable in any course as user is not a 'FACULTY'.` });
    }

    const courseData = await createNewCourse({ adminId, facultyId, courseName })
    if (!courseData) {
        return res.status(400).json({ message: `some thing want wrong` });
    }

    return res.status(201).json({ data: { ...courseData } })
}

export const getCourses = async (req, res) => {
    const coursesData = await getAllCourses()
    if (!coursesData) {
        return res.status(400).json({ message: `No data found` });
    }

    return res.status(201).json({ data: { ...coursesData } })
}

export const addMaterialToCourse = async (req, res) => {
    const courseId = req.params.courseId
    const facultyId = req.user.id
    console.log(courseId, facultyId);


    if (!courseId) {
        return res.status(401).json({ message: `courseId should be there in the params` })
    }

    if (!facultyId) {
        return res.status(401).json({ message: `facultyId not found must be not loggedin` })
    }

    const courseData = await getCourseById(courseId)
    // console.log(courseData);

    if (courseData.facultyId !== facultyId) {
        return res.status(404).json({ message: `This faculty is not assign to this course` })
    }

    const validationResult = await addMaterialToCourcePostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { title, description, fileUrl } = validationResult.data
    console.log(title, description, fileUrl);

    const materialData = await addNewMaterial({ courseId, facultyId, title, description, fileUrl })
    console.log(materialData);


    return res.status(201).json({ data: { ...materialData } })
}

export const getCourseMaterials = async (req, res) => {
    const courseId = req.params.courseId

    const materialsData = await getMaterialsByCourseId(courseId)
    if (!materialsData) {
        return res.status(404).json({ message: `no materials found of of this courseId` })
    }

    return res.status(200).json({ data: { ...materialsData } })
}