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
exports.PersonalInfoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const checkProperty = payload.data.personalInfo;
        const ifExist = yield transactionClient.personal_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        // let obj1 = payload.data.checkProperty
        // let obj2 = ifExist
        // const areObjectsEqual = (obj1: any, obj2: any) => {
        //     return JSON.stringify(obj1) === JSON.stringify(obj2);
        // }
        // const isMatchTrue = (areObjectsEqual(obj1, obj2))
        if (ifExist) {
            const res = yield transactionClient.personal_Info.update({
                where: {
                    id: ifExist.id
                },
                data: Object.assign({}, checkProperty)
            });
            return res;
        }
        else {
            const res = yield transactionClient.personal_Info.create({
                data: Object.assign(Object.assign({}, checkProperty), { user_id: payload.user_id })
            });
            return res;
        }
        // if (ifExist && !isMatchTrue) {
        //     const res = await transactionClient.family_Info.update({
        //         where: {
        //             id: ifExist.id
        //         },
        //         data: checkProperty
        //     })
        //     return res
        // }else if(ifExist && isMatchTrue){
        //     return {
        //         res: 'Nothing changed'
        //     }
        // }else {
        //     const res = await transactionClient.family_Info.create({
        //         data: {...checkProperty,user_id:payload.user_id}
        //     })
        //     return res
        // }
    }));
    // const { ...resData } = payload.data.personalInfo
    // const res = await prisma.personal_Info.create({
    //     data: {
    //         ...resData, user_id: payload.user_id
    //     }
    // })
    return response;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.personal_Info.findMany();
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.personal_Info.findFirst({
        where: {
            user_id: id
        },
        select: {
            above_ankles: true,
            beard: true,
            contact_number: true,
            deen_work: true,
            diseases: true,
            dress_outside: true,
            fique: true,
            hobbies: true,
            islamic_books: true,
            islamic_schoolars: true,
            mahram_non_mahram: true,
            pray_five_time: true,
            recite_quran: true,
            song_drama_movie: true
        }
    });
    return res;
});
const deletePersonalInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.personal_Info.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updatePersonalInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.personal_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.PersonalInfoService = {
    create,
    getAll,
    getSingle,
    deletePersonalInfo,
    updatePersonalInfo
};
