import express from 'express'
import { AuthController } from './controller'


const router = express.Router()


router.post('/login',AuthController.LoginController)
router.post('/register',AuthController.RegisterController)
router.post('/refresh-token',
// validateRequest(UserZodValidation.refreshTokenZodSchema),
AuthController.createAccessToken)


export const AuthRouter = router