import { Router } from 'express'
import { getUserProfile, loginUser, signupUser } from '../controllers/user.controller.js'
import { isLogedIn } from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', isLogedIn, getUserProfile)

export {
    userRouter
}