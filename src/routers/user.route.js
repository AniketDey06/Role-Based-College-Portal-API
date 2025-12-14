import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)

export {
    userRouter
}