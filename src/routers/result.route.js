import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants.js";
import { createResult, getResult } from "../controllers/result.controller.js";

const resultRouter = Router()

resultRouter.use(isLogedIn)

resultRouter.post('/', checkRole([UserRoleEnum.ADMIN]), createResult)
resultRouter.get('/:studentId', checkRole(AvailableUserRoles), getResult)

export {
    resultRouter
}