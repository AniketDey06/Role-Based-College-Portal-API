import { verifyUserToken } from "../utils/token.js"

export async function isLogedIn(req, res, next) {
    const token = req.cookies?.token
    console.log(token);

    if (!token) {
        return next()
    }


    const payload = await verifyUserToken(token)

    req.user = payload
    next()
}