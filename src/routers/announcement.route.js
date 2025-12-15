import { Router } from "express";
import { checkRole, isLogedIn } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants.js";
import { createAnnouncement, getAnnouncement } from "../controllers/announcement.controller.js";

const announcementRouter = Router()

announcementRouter.use(isLogedIn)

announcementRouter.route('/')
    .post(
        checkRole([UserRoleEnum.ADMIN, UserRoleEnum.FACULTY]),
        createAnnouncement
    )
    .get(
        checkRole(AvailableUserRoles),
        getAnnouncement
    )

export {
    announcementRouter
}