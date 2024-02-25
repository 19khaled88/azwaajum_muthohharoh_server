import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {
    const response = await prisma.$transaction(async transactionClient => {
        const checkProperty = payload.data.familyInfo

        const { ...resData } = payload.data.familyInfo
        const fields = ['brothers', 'brothers_details', 'sisters', 'sisters_details', 'paternal_maternal_uncles_details'];
        // fields.forEach(field => {
        //     // Check if the field is not already present in familyInfo
        //     if (!resData.hasOwnProperty(field)) {
        //         checkProperty[field] = ''
        //     }
        // });

        const ifExist: any = await transactionClient.family_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        })


        let obj1 = checkProperty
        let obj2 = ifExist

        const areObjectsEqual = (obj1: any, obj2: any) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        const isMatchTrue = (areObjectsEqual(obj1, obj2))

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
            const res = await transactionClient.family_Info.update({
                where: {
                    id: ifExist.id
                },
                data: checkProperty
            })
            return res


        } else {
            fields.forEach(field => {
                // Check if the field is not already present in familyInfo
                if (!resData.hasOwnProperty(field)) {
                    checkProperty[field] = ''
                }
            });

            const res = await transactionClient.family_Info.create({
                data: { ...checkProperty, user_id: payload.user_id }
            })
            return res
        }
    });



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
}

const getAll = async () => {
    const res = await prisma.family_Info.findMany()
    return res
}

const getSingle = async (id: any) => {

    const res: any = await prisma.family_Info.findFirst({
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
        const nonEmptyFields: any = {};
        for (const key in res) {
            if (res[key]) {
                nonEmptyFields[key] = res[key];
            }
        }
        return nonEmptyFields;
    } else {
        return null; // Or handle the case where no record is found
    }

    return res
}

const deleteFamilyInfo = async (id: any) => {
    const res = await prisma.family_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateFamilyInfo = async (id: any, payload: any) => {
    const res = await prisma.family_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const FamilyInfoService = {
    create,
    getAll,
    getSingle,
    deleteFamilyInfo,
    updateFamilyInfo
}