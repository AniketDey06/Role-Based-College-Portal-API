import { Router } from "express";

import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants.js";
import { createCourse, getCourses } from "../controllers/course.controller.js";

const courseRouter = Router()

courseRouter.use(isLogedIn)

courseRouter.route('/')
    .post(checkRole([UserRoleEnum.ADMIN]), createCourse)
    .get(checkRole(AvailableUserRoles), getCourses)

courseRouter.route('/:courseId/materials')
    .post(checkRole([UserRoleEnum.FACULTY]))


export {
    courseRouter
}