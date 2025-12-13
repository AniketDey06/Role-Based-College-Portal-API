import { createHmac, randomBytes } from "crypto"

export function createHashedPassword(password) {
    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

    return {salt, hashedPassword}
} 