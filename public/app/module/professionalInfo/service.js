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
exports.ProfessionalInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProperty = payload.data.professionalInfo;
        const ifExist = yield transactionClient.professional_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        if (ifExist) {
            const res = yield prisma.professional_Info.update({
                where: {
                    id: ifExist.id
                },
                data: Object.assign({}, checkProperty)
            });
            return res;
        }
        else {
            const res = yield prisma.professional_Info.create({
                data: Object.assign(Object.assign({}, checkProperty), { user_id: payload.user_id })
            });
            return res;
        }
    }));
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.professional_Info.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.professional_Info.findFirst({
        where: {
            user_id: id
        },
        select: {
            income: true,
            occupation: true,
            occupation_description: true
        }
    });
    return res;
});
const deleteProfessionalInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.professional_Info.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateProfessionalInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.professional_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.ProfessionalInfoService = {
    create,
    getAll,
    getSingle,
    deleteProfessionalInfo,
    updateProfessionalInfo
};
