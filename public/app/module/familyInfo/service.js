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
exports.FamilyInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProperty = payload.data.familyInfo;
        const resData = __rest(payload.data.familyInfo, []);
        const fields = ['brothers', 'brothers_details', 'sisters', 'sisters_details', 'paternal_maternal_uncles_details'];
        // fields.forEach(field => {
        //     // Check if the field is not already present in familyInfo
        //     if (!resData.hasOwnProperty(field)) {
        //         checkProperty[field] = ''
        //     }
        // });
        const ifExist = yield transactionClient.family_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        let obj1 = checkProperty;
        let obj2 = ifExist;
        const areObjectsEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        };
        const isMatchTrue = (areObjectsEqual(obj1, obj2));
        //         if (ifExist && !isMatchTrue) {
        //             const updatedFields: any = {};
        //             fields.forEach(field => {
        //                 if (ifExist && checkProperty.hasOwnProperty(field) && checkProperty[field] !== ifExist[field]) {
        //                     updatedFields[field] = checkProperty[field];
        //                 }
        //             });
        //             const {user_id,id, ...resData} = checkProperty
        //             const res = await transactionClient.family_Info.update({
        //                 where: {
        //                     id: ifExist.id
        //                 },
        //                 data: checkProperty
        //             })
        //             return res
        //         } else if (ifExist && isMatchTrue) {
        //             return {
        //                 res: 'Nothing changed'
        //             }
        //         } else {
        //             const res = await transactionClient.family_Info.create({
        //                 data: {...checkProperty,user_id:payload.user_id}
        //             })
        //             return res
        //         }
        if (ifExist) {
            const res = yield transactionClient.family_Info.update({
                where: {
                    id: ifExist.id
                },
                data: checkProperty
            });
            return res;
        }
        else {
            fields.forEach(field => {
                // Check if the field is not already present in familyInfo
                if (!resData.hasOwnProperty(field)) {
                    checkProperty[field] = '';
                }
            });
            const res = yield transactionClient.family_Info.create({
                data: Object.assign(Object.assign({}, checkProperty), { user_id: payload.user_id })
            });
            return res;
        }
    }));
    // const responses = await prisma.$transaction(async transactionClient => {
    //     const checkProperty = payload.data.familyInfo;
    //     const fields = ['brothers', 'brothers_details', 'sisters', 'sisters_details', 'paternal_maternal_uncles_details'];
    //     // Initialize an object to store the fields that need to be updated
    //     const updatedFields: any = {};
    //     const ifExist:any = await transactionClient.family_Info.findFirst({
    //         where: {
    //             user_id: payload.user_id
    //         }
    //     });
    //     // Compare values in checkProperty with ifExist and update updatedFields accordingly
    //     fields.forEach(field => {
    //         if (ifExist && checkProperty.hasOwnProperty(field) && checkProperty[field] !== ifExist[field]) {
    //             updatedFields[field] = checkProperty[field];
    //         }
    //     });
    //     if (ifExist && Object.keys(updatedFields).length > 0) {
    //         // Update only the fields that have changed
    //         const res = await transactionClient.family_Info.update({
    //             where: {
    //                 id: ifExist.id
    //             },
    //             data: updatedFields
    //         });
    //         return updatedFields;
    //     } else if (ifExist && Object.keys(updatedFields).length === 0) {
    //         // If no fields have changed, return a message indicating that
    //         return {
    //             res: 'Nothing changed'
    //         };
    //     } else {
    //         // If the record doesn't exist, create a new one
    //         const res = await transactionClient.family_Info.create({
    //             data: {...checkProperty,user_id:payload.user_id}
    //         });
    //         return checkProperty;
    //     }
    // });
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.family_Info.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.family_Info.findFirst({
        where: {
            user_id: id
        },
        select: {
            brothers: true,
            brothers_details: true,
            deen_practice_in_house: true,
            economy_short_brief: true,
            economy_status: true,
            father_name: true,
            father_profession_details: true,
            if_father_died: true,
            if_mother_died: true,
            mother_name: true,
            mother_profession_details: true,
            paternal_maternal_uncles_details: true,
            sisters: true,
            sisters_details: true
        }
    });
    if (res) {
        // Filter out empty fields
        const nonEmptyFields = {};
        for (const key in res) {
            if (res[key]) {
                nonEmptyFields[key] = res[key];
            }
        }
        return nonEmptyFields;
    }
    else {
        return null; // Or handle the case where no record is found
    }
    return res;
});
const deleteFamilyInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.family_Info.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateFamilyInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.family_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.FamilyInfoService = {
    create,
    getAll,
    getSingle,
    deleteFamilyInfo,
    updateFamilyInfo
};
