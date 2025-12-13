import { createUser, getUserByEmail } from "../service/user.service.js";
import { createHashedPassword } from "../utils/hash.js";
import { signupPostRequstBodySchema } from "../validations/request.validation.js"

export const signupUser = async (req, res) => {
    const validationResult = await signupPostRequstBodySchema.safeParseAsync(req.body)

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { name, email, password } = validationResult.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return res.status(400).json({
            error: `user is already there`,
            user: existingUser
        })
    }

    const { salt, hashedPassword } = createHashedPassword(password)
    const userId = await createUser({ name, email, password: hashedPassword, salt })

    return res.status(201).json({ data: { userId: userId } })
}
