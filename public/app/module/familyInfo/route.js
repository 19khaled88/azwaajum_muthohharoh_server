"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/create', controller_1.FamilyInfoController.create);
router.get('/getAll', controller_1.FamilyInfoController.getAll);
router.get('/getSingle/:id', controller_1.FamilyInfoController.getSingle);
router.delete('/delete/:id', controller_1.FamilyInfoController.deleteFamilyInfo);
router.patch('/update/:id', controller_1.FamilyInfoController.updateFamilyInfo);
exports.FamilyRouter = router;
