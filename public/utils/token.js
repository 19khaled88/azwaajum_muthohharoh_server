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
exports.verifyJwt = exports.verifyRefreshToken = exports.createAccessTokenFromRefreshToken = exports.createTokens = exports.signJwt = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ACCESS_TOKEN_KEY = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCT1FJQkFBSkFZOHRTUEZXMTk3bWgwcitCWUdLVTA4OFRPcDkrT2FObVNWQ1lMMTFhb05ZeEY1TSs1d0NSCnNDTnAxVEdHNW5zb215NW9QRitLajFsOGhjbmtUSUU2SndJREFRQUJBa0FVN2dLc1ZzbVlVQjJKWnRMS2xVSmoKZmUycGdPUG5VTWJXSDRvYmZQZlIvWGNteTdONkQyVXVQcnJ0MkdQVUpnNVJ4SG5NbVFpaDJkNHUwY3pqRDhpcApBaUVBcDFNaUtvY1BEWDJDU0lGN3c5SzVGWHlqMjIzQXJQcVJoUzNtL1dkVzVlVUNJUUNZcmxyeXRJOFkvODIzCkQ1ZTFHVExnbDlTcXN1UWdvaGF4ZCtKaXludGZHd0lnQ2xlK0xlakpTbWt1cTNLdGhzNDR1SlpLdnA2TElXWWYKcHA3T3YyMHExdTBDSVFDSy9lYWpuZ1hLLzB3NXcwTWJSUVpRK1VkTDRqRFZHRm5LVTFYUEUzOStVd0lnSEdLWgpjcDd2K3VyeG5kU05GK25MVEpZRG9abkMrKytteXRMaCtSUmU4dVU9Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t';
const saltRounds = 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        throw new Error('Error comparing passwords');
    }
});
exports.comparePasswords = comparePasswords;
const signJwt = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.default.accessToken, {
        expiresIn: config_1.default.accessTokenExpiresIn,
    });
});
exports.signJwt = signJwt;
const createTokens = (payload, key, expires) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: expires,
    });
});
exports.createTokens = createTokens;
const createAccessTokenFromRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.default.accessToken, {
        expiresIn: config_1.default.accessTokenExpiresIn,
    });
});
exports.createAccessTokenFromRefreshToken = createAccessTokenFromRefreshToken;
const verifyRefreshToken = (refreshToken, key) => {
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refreshToken);
        return payload;
    }
    catch (error) {
        throw new Error('Invalid token found');
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
// export const signJwt = async(payload: Object, options: SignOptions = {}) => {
//     return jwt.sign(payload, config.accessToken as Secret, {
//         ...(options && options),
//     });
// };
// process.env.ACCESS_TOKEN_KEY
// export const verifyJwt = <T>(token: string): JwtPayload  => {
// 	try {
// 		const isVerified = jwt.verify(token, ACCESS_TOKEN_KEY) as JwtPayload;
// 		console.log(token)
// 		return isVerified
// 	} catch (error) {
// 		throw new Error('Invalid token found')
// 	}
// };
const verifyJwt = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_KEY);
        return payload;
    }
    catch (error) {
        throw new Error('Invalid token found');
    }
};
exports.verifyJwt = verifyJwt;
