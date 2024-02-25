"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const token_1 = require("../../../utils/token");
const config_1 = __importDefault(require("../../../config"));
const prisma = new client_1.PrismaClient();
const LoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield prisma.user.findFirst({
            where: {
                email: payload.email
            }
        });
        if (!isExist) {
            throw new Error('This user not found');
        }
        if (payload.password === undefined) {
            throw new Error('password not given');
        }
        if (isExist !== null &&
            payload.password !== undefined && (yield (0, token_1.comparePasswords)(payload.password, isExist.password))) {
            // console.log('please generate token')
            //create access token, refresh token 
            const data = { id: isExist.id, role: isExist.role, email: isExist.email };
            // const accessToken = await signJwt(data)
            const accessToken = yield (0, token_1.createTokens)(data, config_1.default.accessToken, config_1.default.accessTokenExpiresIn);
            const refreshToken = yield (0, token_1.createTokens)(data, config_1.default.refreshToken, config_1.default.refreshTokenExpiresIn);
            return {
                accessToken,
                refreshToken
                // expires_in: config.accessTokenExpiresIn as string
            };
            // const refreshToken = await createRefreshToken(data)
        }
        else {
            throw new Error('Password not match or invalid');
        }
    }));
    return response;
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
});
const RegisterService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.user.findFirst({
            where: {
                email: payload.email
            }
        });
        if (isExist) {
            throw new Error('This user already exist in our database');
        }
        const Hashed = yield (0, token_1.hashPassword)(payload.password);
        payload.password = Hashed;
        const res = yield transactionClient.user.create({
            data: payload
        });
        if (!res) {
            throw new Error('Registration falied');
        }
        if (res) {
            yield transactionClient.bio_data.create({
                data: { user_id: res.id }
            });
        }
        const data = { id: res.id, role: res.role, email: res.email };
        // const accessToken = await signJwt(data)
        const accessToken = yield (0, token_1.createTokens)(data, config_1.default.accessToken, config_1.default.accessTokenExpiresIn);
        const refreshToken = yield (0, token_1.createTokens)(data, config_1.default.refreshToken, config_1.default.refreshTokenExpiresIn);
        return {
            accessToken,
            refreshToken
        };
    }));
    return response;
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
});
const createAccessToken = (key, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const res = (0, token_1.verifyRefreshToken)(refreshToken, key);
    if (res) {
        const data = { id: res.id, role: res.role, email: res.email };
        const accessToken = yield (0, token_1.createTokens)(data, config_1.default.accessToken, config_1.default.accessTokenExpiresIn);
        const refreshToken = yield (0, token_1.createTokens)(data, config_1.default.refreshToken, config_1.default.refreshTokenExpiresIn);
        return {
            accessToken,
            refreshToken
        };
    }
    else {
        return null;
    }
    // console.log(key,token)
});
exports.AuthService = {
    LoginService,
    RegisterService,
    createAccessToken
};
