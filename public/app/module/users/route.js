"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/login', controller_1.AuthController.LoginController);
router.post('/register', controller_1.AuthController.RegisterController);
router.post('/refresh-token', 
// validateRequest(UserZodValidation.refreshTokenZodSchema),
controller_1.AuthController.createAccessToken);
exports.AuthRouter = router;
