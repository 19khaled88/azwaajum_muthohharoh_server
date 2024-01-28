import { NextFunction, Request, Response } from "express"
import { AuthService } from "./service"


const LoginController =async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const response = await AuthService.LoginService(req.body)
        res.status(200).json({
            success:true,
            message:'Login successful',
            data:response
        })
    } catch (error:any) {
        res.status(400).json({
            success:false,
            message:'Failed!, email or password wrong',
            data:error
        })
    }
}

const RegisterController =async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const response = await AuthService.RegisterService(req.body)
        res.status(200).json({
            success:true,
            message:'User created successfully',
            data:response
        })
    } catch (error:any) {
        res.status(400).json({
            success:false,
            message:'This User not created',
            data:error
        })
    }
}

const createAccessToken=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthService.createAccessToken(req.body)
        res.status(200).json({
            success:true,
            message:'Refresh token created successfully',
            data:response
        })
    } catch (error:any) {
        res.status(400).json({
            success:false,
            message:'Something wrong with creating refresh token',
            data:error
        })
    }
}

export const AuthController = {
    LoginController,
    RegisterController,
    createAccessToken
}