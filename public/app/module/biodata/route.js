"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioDataRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/create', controller_1.BioDataController.create);
router.get('/getAll', controller_1.BioDataController.getAll);
router.post('/frontEndShow', controller_1.BioDataController.frontEndShow);
router.get('/getPending', controller_1.BioDataController.getPending);
router.get('/getApproved', controller_1.BioDataController.getApproved);
router.get('/getRejected', controller_1.BioDataController.getRejected);
router.get('/getSingle/:id', controller_1.BioDataController.getSingle);
router.delete('/delete/:id', controller_1.BioDataController.deleteBioData);
router.patch('/update/:id', controller_1.BioDataController.updateBioData);
exports.BioDataRouter = router;
