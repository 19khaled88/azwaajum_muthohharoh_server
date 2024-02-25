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
exports.AgreementInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProperty = payload.data.agreementInfo;
        const ifExist = yield transactionClient.agreementInfo.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        if (ifExist) {
            const res = yield transactionClient.agreementInfo.update({
                where: {
                    id: ifExist.id
                },
                data: Object.assign({}, checkProperty)
            });
            return res;
        }
        else {
            const res = yield transactionClient.agreementInfo.create({
                data: Object.assign(Object.assign({}, checkProperty), { user_id: payload.user_id })
            });
            return res;
        }
    }));
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.agreementInfo.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.agreementInfo.findFirst({
        where: {
            user_id: id
        },
        select: {
            candidate_responsibility: true,
            information_truth: true,
            parents_aware: true
        }
    });
    return res;
});
const deleteAgreementInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.agreementInfo.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateAgreementInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.agreementInfo.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.AgreementInfoService = {
    create,
    getAll,
    getSingle,
    deleteAgreementInfo,
    updateAgreementInfo
};
