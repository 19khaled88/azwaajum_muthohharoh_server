import { Prisma, PrismaClient } from "@prisma/client"
import { IPaginationOptions } from "../../../shared/paginationType"
import { IFilters } from "../../../shared/filterType"
import { IGenericResponse } from "../../../shared/paginationResponse"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { User } from "./interface"



const prisma = new PrismaClient()




const create = async (payload: any) => {
    const res = await prisma.bio_data.create({
        data: payload
    })
    return res
}

const getAll = async () => {

    // Find user(s) with role "admin"
    const normalUsers = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });

    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);


    const res = await prisma.bio_data.findMany({
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
    })

    return res
}

const frontEndShow = async (
    paginationOptions: IPaginationOptions,
    filterOptions: IFilters): Promise<IGenericResponse<any>> => {


    // console.log(payload)
    const { searchTerm, ...filterData } = filterOptions;

    const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);
    const response = await prisma.$transaction(async transactionClient => {
        const andConditions: { user: User }[] = [{ user: {} }];

        // Push the make: 'YES' condition into the andConditions array


        //searching code
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
                    value = (filterData as any)['per_district'];
                    // Push the condition inside andConditions
                    andConditions[0].user.permanent_addresses = {
                        some: {
                            district: {
                                equals: value
                            }
                        }
                    };
                } else if (key === 'pre_district') {
                    value = (filterData as any)['pre_district'];
                    // Push the condition inside andConditions
                    andConditions[0].user.present_addresses = {
                        some: {
                            district: {
                                equals: value
                            }
                        }
                    };
                } else if (key === 'candidate') {
                    value = (filterData as any)['candidate'];
                    // Push the condition inside andConditions
                    andConditions[0].user.general_Info = {
                        some: {
                            bio_type: {
                                equals: value
                            }
                        }
                    };
                } else if (key === 'age') {
                    value = (filterData as any)['age'];
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
                } else if (key === 'marital_status') {
                    value = (filterData as any)['marital_status'];
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

        const whereCondition: Prisma.Bio_dataWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

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
            where: { ...whereCondition, make: 'YES' },
            skip,
            take: limit,
            orderBy:
                paginationOptions.sortBy && paginationOptions.sortOrder
                    ? {
                        [paginationOptions.sortBy]: paginationOptions.sortOrder
                    }
                    : { createAt: 'asc' },
        })
        return res
    });


    // const total = await prisma.bio_data.count();
    const total = response.length
    return {
        meta: {
            page,
            limit,
            total
        },
        data: response

    }
}

const getApproved = async () => {

    // Find user(s) with role "admin"
    const normalUsers = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });

    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);


    const res = await prisma.bio_data.findMany({
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
    })

    return res
}

const getPending = async () => {

    // Find user(s) with role "admin"
    const normalUsers = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });

    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);


    const res = await prisma.bio_data.findMany({
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
    })

    return res
}

const getRejected = async () => {

    // Find user(s) with role "admin"
    const normalUsers = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    });

    // Extract user IDs from the adminUsers array
    const normalUserIds = normalUsers.map(user => user.id);


    const res = await prisma.bio_data.findMany({
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
    })

    return res
}

const getSingle = async (id: any) => {
    const res = await prisma.bio_data.findFirst({
        where: {
            id: id
        }
    });
    return res
}

const deleteBioData = async (id: any) => {
    const res = await prisma.bio_data.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateBioData = async (id: any, payload: any) => {
    const res = await prisma.bio_data.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const BioDataService = {
    create,
    getAll,
    getSingle,
    deleteBioData,
    updateBioData,
    getApproved,
    getPending,
    getRejected,
    frontEndShow
}