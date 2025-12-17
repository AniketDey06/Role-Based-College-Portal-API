import { getAllUsers } from "../service/user.service.js"

export const listAllUsers = async (req, res) => {
    const allUserData = await getAllUsers()
    if (!allUserData) {
        return res.status(404).json({ message: `no user data found in DB` })
    }
    return res.status(200).json({ data: { ...allUserData } })
}