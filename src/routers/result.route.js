import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { UserRoleEnum } from "../utils/constants.js";
import { createResult } from "../controllers/result.controller.js";

const resultRouter = Router()

resultRouter.use(isLogedIn)

resultRouter.post('/', checkRole([UserRoleEnum.ADMIN]), createResult)

export {
    resultRouter
}