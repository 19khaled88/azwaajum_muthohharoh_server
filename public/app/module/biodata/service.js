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
exports.BioDataService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.bio_data.create({
        data: payload
    });
    return res;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find user(s) with role "admin"
    const normalUsers = yield prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });
    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);
    const res = yield prisma.bio_data.findMany({
        where: {
            user_id: { in: normalUserIds },
            make: 'YES'
        },
        select: {
            id: true,
            user: {
                select: {
                    general_Info: true,
                    present_addresses: true,
                    permanent_addresses: true,
                    educational_Info: true,
                    family_Info: true,
                    personal_Info: true,
                    professional_Info: true,
                    marital_Info: true,
                    partner_Info: true,
                    agreementInfo: true,
                    contactInfo: true
                }
            },
            status: true,
            createAt: true,
            updatedAt: true
        }
    });
    return res;
});
const frontEndShow = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload)
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const andConditions = [{ user: {} }];
        // Push the make: 'YES' condition into the andConditions array
        // searching code
        // if (searchTerm) {
        //     andConditions.push({
        //         OR: bio_fields_constant.map(field => {
        //             return {
        //                 [field]: {
        //                     contains: searchTerm,
        //                     mode: 'insensitive'
        //                 }
        //             };
        //         })
        //     });
        // }
        //filtering code
        // if (Object.keys(filterData).length > 0) {
        //     // Loop through each key in filterData
        //     Object.keys(filterData).forEach(key => {
        //         if (key === 'per_district') {
        //             andConditions.push({
        //                 user: {
        //                     permanent_addresses: {
        //                         some: {
        //                             district: {
        //                                 equals: (filterData as any)['per_district']
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //         } else if (key === 'pre_district') {
        //             andConditions.push({
        //                 user: {
        //                     present_addresses: {
        //                         some: {
        //                             district: {
        //                                 equals: (filterData as any)['pre_district']
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //         } else if (key === 'candidate') {
        //             andConditions.push({
        //                 user: {
        //                     general_Info: {
        //                         some: {
        //                             bio_type: {
        //                                 equals: (filterData as any)['candidate']
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //         } else if (key === 'age') {
        //             let ageRange = (filterData as any)['age'].split('-');
        //             const currentDate = new Date();
        //             const minBirthDate = new Date(currentDate.getFullYear() - ageRange[1], currentDate.getMonth(), currentDate.getDate());
        //             const maxBirthDate = new Date(currentDate.getFullYear() - ageRange[0] - 1, currentDate.getMonth(), currentDate.getDate());
        //             andConditions.push({
        //                 user: {
        //                     general_Info: {
        //                         some: {
        //                             birth_date: {
        //                                 gte: minBirthDate.toISOString(),
        //                                 lt: maxBirthDate.toISOString()
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //         } else if (key === 'marital_status') {
        //             andConditions.push({
        //                 user: {
        //                     general_Info: {
        //                         some: {
        //                             marital_status: {
        //                                 equals: (filterData as any)['marital_status']
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //         }
        //         // Add more conditions if needed
        //     });
        // }
        if (Object.keys(filterData).length > 0) {
            // Loop through each key in filterData
            Object.keys(filterData).forEach(key => {
                let value;
                if (key === 'per_district') {
                    value = filterData['per_district'];
                    // Push the condition inside andConditions
                    andConditions[0].user.permanent_addresses = {
                        some: {
                            district: {
                                equals: value
                            }
                        }
                    };
                }
                else if (key === 'pre_district') {
                    value = filterData['pre_district'];
                    // Push the condition inside andConditions
                    andConditions[0].user.present_addresses = {
                        some: {
                            district: {
                                equals: value
                            }
                        }
                    };
                }
                else if (key === 'candidate') {
                    value = filterData['candidate'];
                    // Push the condition inside andConditions
                    andConditions[0].user.general_Info = {
                        some: {
                            bio_type: {
                                equals: value
                            }
                        }
                    };
                }
                else if (key === 'age') {
                    value = filterData['age'];
                    // Push the condition inside andConditions
                    const currentDate = new Date();
                    const minBirthDate = new Date(currentDate.getFullYear() - value[1], currentDate.getMonth(), currentDate.getDate());
                    const maxBirthDate = new Date(currentDate.getFullYear() - value[0] - 1, currentDate.getMonth(), currentDate.getDate());
                    andConditions[0].user.general_Info = {
                        some: {
                            birth_date: {
                                gte: minBirthDate.toISOString(),
                                lt: maxBirthDate.toISOString()
                            }
                        }
                    };
                }
                else if (key === 'marital_status') {
                    value = filterData['marital_status'];
                    // Push the condition inside andConditions
                    andConditions[0].user.general_Info = {
                        some: {
                            marital_status: {
                                equals: value
                            }
                        }
                    };
                }
            });
        }
        const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
        const res = transactionClient.bio_data.findMany({
            // where: {
            //     make: 'YES',
            //     user: {
            //         permanent_addresses: {
            //             some: {
            //                 district: {
            //                     equals:'chittagong'
            //                 }
            //             }
            //         },present_addresses:{
            //             some:{
            //                 district:{
            //                     equals:'chittagong'
            //                 }
            //             }
            //         },general_Info:{
            //             some:{
            //                 bio_type:{
            //                     equals:'bride'
            //                 }
            //             }
            //         }
            //     }
            // },
            where: Object.assign(Object.assign({}, whereCondition), { make: 'YES', status: 'APPROVED' }),
            skip,
            take: limit,
            orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
                ? {
                    [paginationOptions.sortBy]: paginationOptions.sortOrder
                }
                : { createAt: 'asc' },
        });
        return res;
    }));
    // const total = await prisma.bio_data.count();
    const total = response.length;
    return {
        meta: {
            page,
            limit,
            total
        },
        data: response
    };
});
const getApproved = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find user(s) with role "admin"
    const normalUsers = yield prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });
    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);
    const res = yield prisma.bio_data.findMany({
        where: {
            user_id: { in: normalUserIds },
            make: 'YES',
            status: 'APPROVED'
        },
        select: {
            id: true,
            user: {
                select: {
                    general_Info: true,
                    present_addresses: true,
                    permanent_addresses: true,
                    educational_Info: true,
                    family_Info: true,
                    personal_Info: true,
                    professional_Info: true,
                    marital_Info: true,
                    partner_Info: true,
                    agreementInfo: true,
                    contactInfo: true
                }
            },
            status: true,
            createAt: true,
            updatedAt: true
        }
    });
    return res;
});
const getPending = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find user(s) with role "admin"
    const normalUsers = yield prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });
    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);
    const res = yield prisma.bio_data.findMany({
        where: {
            user_id: { in: normalUserIds },
            make: 'YES',
            status: 'PENDING'
        },
        select: {
            id: true,
            user: {
                select: {
                    general_Info: true,
                    present_addresses: true,
                    permanent_addresses: true,
                    educational_Info: true,
                    family_Info: true,
                    personal_Info: true,
                    professional_Info: true,
                    marital_Info: true,
                    partner_Info: true,
                    agreementInfo: true,
                    contactInfo: true
                }
            },
            status: true,
            createAt: true,
            updatedAt: true
        }
    });
    return res;
});
const getRejected = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find user(s) with role "admin"
    const normalUsers = yield prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });
    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);
    const res = yield prisma.bio_data.findMany({
        where: {
            user_id: { in: normalUserIds },
            make: 'YES',
            status: 'REJECT'
        },
        select: {
            id: true,
            user: {
                select: {
                    general_Info: true,
                    present_addresses: true,
                    permanent_addresses: true,
                    educational_Info: true,
                    family_Info: true,
                    personal_Info: true,
                    professional_Info: true,
                    marital_Info: true,
                    partner_Info: true,
                    agreementInfo: true,
                    contactInfo: true
                }
            },
            status: true,
            createAt: true,
            updatedAt: true
        }
    });
    return res;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.bio_data.findFirst({
        where: {
            id: id
        }
    });
    return res;
});
const deleteBioData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.bio_data.delete({
        where: {
            id: id
        }
    });
    return res;
});
const updateBioData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.bio_data.update({
        where: {
            id: id
        },
        data: payload
    });
    return res;
});
exports.BioDataService = {
    create,
    getAll,
    getSingle,
    deleteBioData,
    updateBioData,
    getApproved,
    getPending,
    getRejected,
    frontEndShow
};
