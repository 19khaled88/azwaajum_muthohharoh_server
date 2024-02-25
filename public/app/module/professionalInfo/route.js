"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/create', controller_1.ProfessionalInfoController.create);
router.get('/getAll', controller_1.ProfessionalInfoController.getAll);
router.get('/getSingle/:id', controller_1.ProfessionalInfoController.getSingle);
router.delete('/delete/:id', controller_1.ProfessionalInfoController.deleteProfessionalInfo);
router.patch('/update/:id', controller_1.ProfessionalInfoController.updateProfessionalInfo);
exports.ProfessionalRouter = router;
