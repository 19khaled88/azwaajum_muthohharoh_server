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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.general_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        let obj1 = payload.data.generalInfo;
        let obj2 = isExist;
        const areObjectsEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        };
        const isMatchTrue = (areObjectsEqual(obj1, obj2));
        if (isExist && !isMatchTrue) {
            const _a = payload.data.generalInfo, { birth_date, user_id, id } = _a, allRest = __rest(_a, ["birth_date", "user_id", "id"]);
            const isoFormattedDate = new Date(birth_date).toISOString();
            const res = yield prisma.general_Info.update({
                where: {
                    id: isExist.id
                },
                data: Object.assign(Object.assign({}, allRest), { birth_date: isoFormattedDate })
            });
            return res;
        }
        if (isExist && isMatchTrue) {
            return {
                res: 'Nothing changed'
            };
        }
        else {
            const _b = payload.data.generalInfo, { birth_date } = _b, allRest = __rest(_b, ["birth_date"]);
            const isoFormattedDate = new Date(birth_date).toISOString();
            const res = yield prisma.general_Info.create({
                data: Object.assign(Object.assign({}, allRest), { birth_date: isoFormattedDate, user_id: payload.user_id })
            });
            return res;
        }
        // if (isExist) {
        //     const { birth_date, user_id,id , ...allRest } = payload.data.generalInfo
        //     const isoFormattedDate = new Date(birth_date).toISOString();
        //     const res = await prisma.general_Info.update({
        //         where: {
        //             id: isExist.id
        //         },
        //         data: { ...allRest, birth_date: isoFormattedDate }
        //     })
        //     return res
        // } else {
        //     const { birth_date, ...allRest } = payload.data.generalInfo
        //     const isoFormattedDate = new Date(birth_date).toISOString();
        //     const res = await prisma.general_Info.create({
        //         data: { ...allRest, birth_date: isoFormattedDate, user_id: payload.userId }
        //     })
        //     return res
        // }
    }));
    return response;
    // const { birth_date, ...allRest } = payload.data.generalInfo
    // const isoFormattedDate = new Date(birth_date).toISOString();
    // const res = await prisma.general_Info.create({
    //     data: { ...allRest, birth_date: isoFormattedDate, user_id: payload.userId }
    // })
    // return res
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.general_Info.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.general_Info.findFirst({
        where: {
            user_id: id
        }
    });
    return res;
});
const deleteGeneralInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.general_Info.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateGeneralInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.general_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.GeneralInfoService = {
    create,
    getAll,
    getSingle,
    deleteGeneralInfo,
    updateGeneralInfo
};
