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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInfoService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { present_address, permanent_address } = payload.data.address;
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isPresentAddressExist = yield transactionClient.present_address.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        const isPermanentAddressExist = yield transactionClient.permanent_address.findFirst({
            where: {
                user_id: payload.user_id
            }
        });
        const areObjectsEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        };
        const isPresentAddressMatchTrue = areObjectsEqual(isPresentAddressExist, payload.data.address.present_address);
        const isPermanentAddressMatchTrue = areObjectsEqual(isPermanentAddressExist, payload.data.address.permanent_address);
        // console.log(isPresentAddressMatchTrue,isPermanentAddressMatchTrue)
        if (!isPresentAddressExist && !isPermanentAddressExist) {
            const present_add = yield transactionClient.present_address.create({
                data: Object.assign(Object.assign({}, present_address), { user_id: payload.user_id })
            });
            const permanent_add = yield transactionClient.permanent_address.create({
                data: Object.assign(Object.assign({}, permanent_address), { user_id: payload.user_id })
            });
            if (present_add && permanent_add) {
                return { present_add, permanent_add };
            }
            else {
                throw new apiError_1.default(400, 'Address not saved!!');
            }
        }
        else if (isPresentAddressExist && isPermanentAddressExist && !isPresentAddressMatchTrue && isPermanentAddressMatchTrue) {
            const _a = payload.data.address.present_address, { id, user_id } = _a, resAddress = __rest(_a, ["id", "user_id"]);
            const res = yield transactionClient.present_address.update({
                where: {
                    id: isPresentAddressExist.id
                },
                data: Object.assign({}, resAddress)
            });
            return res;
        }
        else if (isPresentAddressExist && isPermanentAddressExist && isPresentAddressMatchTrue && !isPermanentAddressMatchTrue) {
            const _b = payload.data.address.permanent_address, { id, user_id } = _b, resAddress = __rest(_b, ["id", "user_id"]);
            const res = yield transactionClient.permanent_address.update({
                where: {
                    id: isPermanentAddressExist.id
                },
                data: Object.assign({}, resAddress)
            });
            return res;
        }
        else if (isPresentAddressExist && isPermanentAddressExist && !isPresentAddressMatchTrue && !isPermanentAddressMatchTrue) {
            const present_add = yield transactionClient.present_address.update({
                where: {
                    id: isPresentAddressExist.id
                },
                data: payload.data.present_address
            });
            const permanent_add = yield transactionClient.permanent_address.update({
                where: {
                    id: isPermanentAddressExist.id
                },
                data: payload.data.permanent_address
            });
            if (present_add && permanent_add) {
                return { present_add, permanent_add };
            }
            else {
                throw new apiError_1.default(400, 'Address not saved!!');
            }
        }
        else if (isPresentAddressExist && isPermanentAddressExist && isPresentAddressMatchTrue && isPermanentAddressMatchTrue) {
            return {
                data: 'All are updated'
            };
        }
        // const present_add = await transactionClient.present_address.create({
        //     data: {...present_address,user_id:payload.userId}
        // })
        // const permanent_add = await transactionClient.permanent_address.create({
        //     data: {...permanent_address,user_id:payload.userId}
        // })
        // if (present_add && permanent_add) {
        //     return { present_add, permanent_add }
        // }else{
        //     throw new ApiError(400,'Address not saved!!')
        // }
    }));
    return result;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const present_add = yield transactionClient.present_address.findMany();
        const permanent_add = yield transactionClient.permanent_address.findMany();
        if (present_add && permanent_add) {
            return { present_add, permanent_add };
        }
    }));
    return result;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const present_address = yield transactionClient.present_address.findFirst({
            where: {
                user_id: id
            }
            // select:{
            //     district:true,
            //     division:true,
            //     post_office:true,
            //     sub_district:true,
            //     village:true
            // }
        });
        const permanent_address = yield transactionClient.permanent_address.findFirst({
            where: {
                user_id: id
            }
            // select:{
            //     district:true,
            //     division:true,
            //     post_office:true,
            //     sub_district:true,
            //     village:true
            // }
        });
        if (present_address && permanent_address) {
            return { present_address, permanent_address };
        }
    }));
    return result;
});
const deleteAddressInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const present_add = yield prisma.present_address.delete({
            where: {
                id: id
            }
        });
        const permanent_add = yield prisma.present_address.delete({
            where: {
                id: id
            }
        });
        if (present_add && permanent_add) {
            return { present_add, };
        }
    }));
    return result;
});
const updateAddressInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const present_add = yield prisma.present_address.update({
            where: {
                id: id
            },
            data: payload
        });
        const permanent_add = yield prisma.present_address.update({
            where: {
                id: id
            },
            data: payload
        });
        if (present_add && permanent_add) {
            return { present_add, };
        }
    }));
    return result;
});
exports.AddressInfoService = {
    create,
    getAll,
    getSingle,
    deleteAddressInfo,
    updateAddressInfo
};
