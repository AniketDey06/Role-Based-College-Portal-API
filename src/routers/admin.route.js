import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { UserRoleEnum } from "../utils/constants.js";
import { changeUserRole, listAllUsers } from "../controllers/admin.controller.js";

const adminRouter = Router()

adminRouter.use(isLogedIn, checkRole([UserRoleEnum.ADMIN]))

adminRouter.get('/', listAllUsers)
adminRouter.put('/:id/role', changeUserRole)

export {
    adminRouter
}