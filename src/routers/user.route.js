import { Router } from 'express'
import { signupUser } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login')

export {
    userRouter
}