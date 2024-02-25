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
exports.ContactInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProperty = payload.data.contactInfo;
        const ifExist = yield transactionClient.contactInfo.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        const bioExist = yield transactionClient.bio_data.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        if (ifExist) {
            const res = yield transactionClient.contactInfo.update({
                where: {
                    id: ifExist.id
                },
                data: Object.assign({}, checkProperty)
            });
            return res;
        }
        else {
            const res = yield transactionClient.contactInfo.create({
                data: Object.assign(Object.assign({}, checkProperty), { user_id: payload.user_id })
            });
            yield transactionClient.bio_data.update({
                where: {
                    id: bioExist === null || bioExist === void 0 ? void 0 : bioExist.id
                },
                data: {
                    make: 'YES'
                }
            });
            return res;
        }
    }));
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.contactInfo.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.contactInfo.findFirst({
        where: {
            user_id: id
        },
        select: {
            candidate_name: true,
            email_address: true,
            guardian_relationship: true,
            gurdian_mobile: true
        }
    });
    return res;
});
const deleteContactInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.contactInfo.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateContactInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.contactInfo.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.ContactInfoService = {
    create,
    getAll,
    getSingle,
    deleteContactInfo,
    updateContactInfo
};
