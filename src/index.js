import express from 'express'
import 'dotenv/config';
import cookieParser from 'cookie-parser'

import { userRouter } from './routers/user.route.js';

const app = express()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT ?? 8000

app.use('/auth', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
})