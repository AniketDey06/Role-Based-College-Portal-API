import { changeUserRoleById, getAllUsers, getUserById } from "../service/user.service.js"
import { chngeRolePostRequstSchema } from "../validations/request.validation.js"

export const listAllUsers = async (req, res) => {
    const allUserData = await getAllUsers()
    if (!allUserData) {
        return res.status(404).json({ message: `no user data found in DB` })
    }

    return res.status(200).json({ data: { ...allUserData } })
}

export const changeUserRole = async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        return res.status(404).json({ message: `userId not found in params` })
    }

    const userData = await getUserById(userId)
    if (!userData) {
        return res.status(404).json({ message: `User dose not exists in DB` })
    }

    const validationResult = await chngeRolePostRequstSchema.safeParseAsync(req.body)
    const { role } = validationResult.data

    if (userData.role === role) {
        return res.status(404).json({ message: `User is already a ${userData.role}.` })
    }

    const updatedUserData = await changeUserRoleById(userId, role)

    return res.status(202).json({ data: { ...updatedUserData } })
}