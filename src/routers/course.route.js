import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { UserRoleEnum } from "../utils/constants.js";
import { createCourse } from "../controllers/course.controller.js";

const courseRouter = Router()

courseRouter.use(isLogedIn)

courseRouter.use('/')
    .post(checkRole([UserRoleEnum.ADMIN]), createCourse)

export {
    courseRouter
}