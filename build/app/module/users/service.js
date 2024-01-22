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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const token_1 = require("../../../utils/token");
const prisma = new client_1.PrismaClient();
const LoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log('please generate token');
        //create access token, refresh token 
        const data = { id: isExist.id, email: isExist.email };
        const accessToken = yield (0, token_1.signJwt)(data);
        return {
            accessToken
        };
        // const refreshToken = await createRefreshToken(data)
    }
    else {
        throw new Error('Password not match or invalid');
    }
});
const RegisterService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findFirst({
        where: {
            email: payload.email
        }
    });
    if (isExist) {
        throw new Error('This user already exist');
    }
    const Hashed = yield (0, token_1.hashPassword)(payload.password);
    payload.password = Hashed;
    const response = yield prisma.user.create({
        data: payload
    });
    if (!response) {
        throw new Error('Registration falied');
    }
    const data = { id: response.id, email: response.email };
    const accessToken = yield (0, token_1.signJwt)(data);
    return {
        accessToken
    };
});
exports.AuthService = {
    LoginService,
    RegisterService
};