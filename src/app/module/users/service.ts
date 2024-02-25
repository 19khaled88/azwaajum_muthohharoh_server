import { Prisma, User, PrismaClient } from "@prisma/client"
import { comparePasswords, createTokens, hashPassword, verifyJwt, verifyRefreshToken } from "../../../utils/token"
import { loginResponse, refreshTokenResponse, registerResponse } from "./interface"
import config from "../../../config"
import { jwtDecode } from "jwt-decode"

const prisma = new PrismaClient()

const LoginService = async (payload: User): Promise<loginResponse> => {

    const response = await prisma.$transaction(async transactionClient => {
        const isExist = await prisma.user.findFirst({
            where: {
                email: payload.email
            }
        });


        if (!isExist) {
            throw new Error('This user not found')
        }

        if (payload.password === undefined) {
            throw new Error('password not given')
        }

        if (isExist !== null &&
            payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {
            // console.log('please generate token')

            //create access token, refresh token 
            const data = { id: isExist.id, role: isExist.role, email: isExist.email as string }
            // const accessToken = await signJwt(data)
            const accessToken = await createTokens(data, config.accessToken, config.accessTokenExpiresIn as string)
            const refreshToken = await createTokens(data, config.refreshToken, config.refreshTokenExpiresIn as string)

            return {
                accessToken,
                refreshToken
                // expires_in: config.accessTokenExpiresIn as string
            }
            // const refreshToken = await createRefreshToken(data)

        } else {
            throw new Error('Password not match or invalid')
        }


    });

    return response

    // const isExist = await prisma.user.findFirst({
    //     where: {
    //         email: payload.email
    //     }
    // })

    // if (!isExist) {
    //     throw new Error('This user not found')
    // }

    // if (payload.password === undefined) {
    //     throw new Error('password not given')
    // }

    // if (isExist !== null &&
    //     payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {
    //     // console.log('please generate token')

    //     //create access token, refresh token 
    //     const data = { id: isExist.id, role: isExist.role, email: isExist.email as string }
    //     // const accessToken = await signJwt(data)
    //     const accessToken = await createTokens(data,config.accessToken,config.accessTokenExpiresIn as string)
    //     const refreshToken = await createTokens(data,config.refreshToken,config.refreshTokenExpiresIn as string)

    //     return {
    //         accessToken,
    //         refreshToken
    //         // expires_in: config.accessTokenExpiresIn as string
    //     }
    //     // const refreshToken = await createRefreshToken(data)

    // } else {
    //     throw new Error('Password not match or invalid')
    // }

}

const RegisterService = async (payload: User): Promise<registerResponse> => {

    const response = await prisma.$transaction(async transactionClient => {

        const isExist = await transactionClient.user.findFirst({
            where: {
                email: payload.email
            }
        })

        if (isExist) {
            throw new Error('This user already exist in our database');
        }

        const Hashed = await hashPassword(payload.password)
        payload.password = Hashed

        const res = await transactionClient.user.create({
            data: payload
        })

        if (!res) {
            throw new Error('Registration falied')
        }

        if (res) {
            await transactionClient.bio_data.create({
                data: { user_id: res.id }
            })
        }

        const data = { id: res.id, role: res.role, email: res.email as string }
        // const accessToken = await signJwt(data)
        const accessToken = await createTokens(data, config.accessToken, config.accessTokenExpiresIn as string)
        const refreshToken = await createTokens(data, config.refreshToken, config.refreshTokenExpiresIn as string)
        return {
            accessToken,
            refreshToken
        }


    });

    return response



    // const isExist = await prisma.user.findFirst({
    //     where: {
    //         email: payload.email
    //     }
    // })

    // if (isExist) {
    //     throw new Error('This user already exist in our database');
    // }

    // const Hashed = await hashPassword(payload.password)
    // payload.password = Hashed


    // const response = await prisma.user.create({
    //     data: payload
    // })

    // if (!response) {
    //     throw new Error('Registration falied')
    // }
    // const data = { id: response.id, role: response.role, email: response.email as string }
    // // const accessToken = await signJwt(data)
    // const accessToken = await createTokens(data,config.accessToken,config.accessTokenExpiresIn as string)
    //     const refreshToken = await createTokens(data,config.refreshToken,config.refreshTokenExpiresIn as string)
    // return {
    //     accessToken,
    //     refreshToken
    // }
}

const createAccessToken = async (key: string, refreshToken: any): Promise<refreshTokenResponse | null> => {
    const res = verifyRefreshToken(refreshToken, key)
    if (res) {
        const data = { id: res.id, role: res.role, email: res.email as string }
        const accessToken = await createTokens(data, config.accessToken, config.accessTokenExpiresIn as string)
        const refreshToken = await createTokens(data, config.refreshToken, config.refreshTokenExpiresIn as string)
        return {
            accessToken,
            refreshToken
        }
    } else {
        return null
    }
    // console.log(key,token)
}




export const AuthService = {
    LoginService,
    RegisterService,
    createAccessToken
}