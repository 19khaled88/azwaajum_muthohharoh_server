import express from 'express'
import { AuthController } from './controller'


const router = express.Router()


router.post('/login',AuthController.LoginController)
router.post('/register',AuthController.RegisterController)


export const AuthRouter = router