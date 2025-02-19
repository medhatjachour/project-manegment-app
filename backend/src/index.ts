import 'dotenv/config'
import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import session from 'cookie-session'
import { config } from './config/app.config'
import connectDatabase from './config/database.config'
import { errorHandler } from './middleware/errorHandler.middleware'
import { httpStatus } from './config/http.config'
import { asyncHandler } from './middleware/asyncHandler.middleware'

const app = express()
const basePath = config.BASE_PATH;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    name: 'session',
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
}))

app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true
}))


app.get(`/`, asyncHandler ( (req: Request, res: Response, next: NextFunction) => {
  
        throw new Error('Error')
        // res.status(httpStatus.OK).json({ message: 'Hello World' })
   
}))

app.use(errorHandler)
app.listen(config.PORT, async () => {
    console.log(`Server is running on http://localhost:${config.PORT} in${config.NODE_ENV}  `);
    await connectDatabase()
})