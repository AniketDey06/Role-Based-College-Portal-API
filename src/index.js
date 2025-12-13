import express from 'express'
import 'dotenv/config';
import { userRouter } from './routers/user.route.js';

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 8000

app.use('/', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
})