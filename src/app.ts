import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import rootRoutes from './app/routes/index'
const app: Application = express()
const corsOptions = { origin: '*'}


//middlwares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req: Request, res: Response) => {
  res.send({ "User Routes": 'This route work successfully' })
})

app.use('/api/v1', rootRoutes)

//page not found router
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app