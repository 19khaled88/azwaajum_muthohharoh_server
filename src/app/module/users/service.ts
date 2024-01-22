import { Prisma, User, PrismaClient } from "@prisma/client"
import { comparePasswords, hashPassword, signJwt } from "../../../utils/token"
import { loginResponse, registerResponse } from "./interface"

const prisma = new PrismaClient()

const LoginService = async (payload: User): Promise<loginResponse> => {

    const isExist = await prisma.user.findFirst({
        where: {
            email: payload.email
        }
    })

    if (!isExist) {
        throw new Error('This user not found')
    }

    if (payload.password === undefined) {
        throw new Error('password not given')
    }

    if (isExist !== null &&
        payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {
        console.log('please generate token')

        //create access token, refresh token 
        const data = { id: isExist.id, email: isExist.email as string }
        const accessToken = await signJwt(data)
        return {
            accessToken
        }
        // const refreshToken = await createRefreshToken(data)

    } else {
        throw new Error('Password not match or invalid')
    }

}

const RegisterService = async (payload: User): Promise<registerResponse> => {

    const isExist = await prisma.user.findFirst({
        where:{
            email:payload.email
        }
    })

    if(isExist){
        throw new Error('This user already exist');
    }

    const Hashed = await hashPassword(payload.password)
    payload.password = Hashed 


    const response = await prisma.user.create({
        data: payload
    })

    if(!response){
        throw new Error('Registration falied')
    } 
    const data = { id: response.id, email: response.email as string }
    const accessToken = await signJwt(data)
    return {
        accessToken
    }
}


export const AuthService = {
    LoginService,
    RegisterService
}