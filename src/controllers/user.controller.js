import { createUser, getUserByEmail } from "../service/user.service.js";
import { createHashedPassword } from "../utils/hash.js";
import { createUserToken } from "../utils/token.js";
import { loginPostBodySchema, signupPostRequstBodySchema } from "../validations/request.validation.js"

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

export const loginUser = async (req, res) => {
    const validationResult = await loginPostBodySchema.safeParseAsync(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { email, password } = validationResult.data

    const user = await getUserByEmail(email)
    if (!user) {
        return res.status(404).json({ error: `user not exsist in db` })
    }

    const { hashedPassword } = createHashedPassword(password, user.salt)

    if(hashedPassword !== user.password){
        return res.status(404).json({ error: `invalid password` })
    }

    const token = await createUserToken({id: user.id})

    res.cookie('token',token)
    return res.json({ token })
}