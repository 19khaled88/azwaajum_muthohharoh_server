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
exports.AuthController = void 0;
const service_1 = require("./service");
const LoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.AuthService.LoginService(req.body);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed!, email or password wrong',
            data: error
        });
    }
});
const RegisterController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.AuthService.RegisterService(req.body);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'This User not created',
            data: error
        });
    }
});
const createAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.AuthService.createAccessToken(req.body.key, req.body.token);
        res.status(200).json({
            success: true,
            message: 'Refresh token created successfully',
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something wrong with creating refresh token',
            data: error
        });
    }
});
exports.AuthController = {
    LoginController,
    RegisterController,
    createAccessToken
};
