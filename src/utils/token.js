import jwt from 'jsonwebtoken'
import { userTokenSchema } from '../validations/token.validation.js'

export async function createUserToken (payload) {
    const validationResult = await userTokenSchema.safeParseAsync(payload)
    if (validationResult.error) {
        throw new Error(validationResult.error)
    }

    const payloadData = validationResult.data
    const token = jwt.sign(payloadData, process.env.JWT_SECRET)

    return token
}

export async function verifyUserToken(token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        return payload
    } catch (error) {
        return null
    }
}