import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { UserRoleEnum } from "../utils/constants.js";
import { getAllUsers } from "../controllers/admin.controller.js";

const adminRouter = Router()

adminRouter.use(isLogedIn, checkRole([UserRoleEnum.ADMIN]))

adminRouter.get('/', getAllUsers)

export {
    adminRouter
}