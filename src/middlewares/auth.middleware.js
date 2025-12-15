import { getUserById } from "../service/user.service.js"
import { verifyUserToken } from "../utils/token.js"

export async function isLogedIn(req, res, next) {
    const token = req.cookies?.token

    if (!token) {
        return next()
    }

    const payload = await verifyUserToken(token)

    req.user = payload
    next()
}

export const checkRole = (role= []) => (async(req, res, next) =>  {
    const user = req.user

    if (!user) {
        return res.status(400).json({message: "User should logedin"})
    }
    
    const userData = await getUserById(user.id)    
    if (!userData) {
        return res.status(404).json({message: "No user found in DB"})
    }

    if (!role.includes(userData.role)) {
        return res.status(404).json({message: "You do not have permissinon to perforn this action"})
    }

    next()
})