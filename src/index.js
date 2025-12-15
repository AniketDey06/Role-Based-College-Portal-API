import express from 'express'
import 'dotenv/config';
import cookieParser from 'cookie-parser'

import { userRouter } from './routers/user.route.js';
import { announcementRouter } from './routers/announcement.route.js';

const app = express()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT ?? 8000

app.use('/auth', userRouter)
app.use('/announcement', announcementRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
})