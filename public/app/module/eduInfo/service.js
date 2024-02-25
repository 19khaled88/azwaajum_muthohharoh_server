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
exports.EduInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = payload.data.educationalInfo, { ssc_year, top_degree_pass_year } = _a, resData = __rest(_a, ["ssc_year", "top_degree_pass_year"]);
        const isExist = yield transactionClient.educational_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        const parsedSscYear = ssc_year ? parseInt(ssc_year) : undefined;
        const parsedTopDegreePassYear = top_degree_pass_year ? parseInt(top_degree_pass_year) : undefined;
        if (!isExist) {
            const res = yield transactionClient.educational_Info.create({
                data: Object.assign(Object.assign({}, resData), { 
                    // Include parsed integer values in the create data
                    ssc_year: parsedSscYear, top_degree_pass_year: parsedTopDegreePassYear, user_id: payload.user_id })
                // data: top_degree_pass_year ?
                //     { ...resData, ssc_year: parseInt(ssc_year), top_degree_pass_year: parseInt(top_degree_pass_year), user_id: payload.userId } :
                //     { ...resData, ssc_year: parseInt(ssc_year), user_id: payload.userId }
            });
            return res;
        }
        else {
            const updateData = Object.assign({}, resData);
            if (parsedSscYear !== undefined) {
                updateData.ssc_year = parsedSscYear;
            }
            if (parsedTopDegreePassYear !== undefined) {
                updateData.top_degree_pass_year = parsedTopDegreePassYear;
            }
            // Remove the 'id' property from updateData
            delete updateData.id;
            const res = yield transactionClient.educational_Info.update({
                where: {
                    id: isExist.id
                },
                data: updateData
            });
            return res;
        }
    }));
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.educational_Info.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.educational_Info.findFirst({
        where: {
            user_id: id
        }
    });
    return res;
});
const deleteEduInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.educational_Info.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateEduInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.educational_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.EduInfoService = {
    create,
    getAll,
    getSingle,
    deleteEduInfo,
    updateEduInfo
};
