import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {
    const response = await prisma.$transaction(async transactionClient => {
        const checkProperty = payload.data.personalInfo

        const ifExist: any = await transactionClient.personal_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        })

        // let obj1 = payload.data.checkProperty
        // let obj2 = ifExist

        // const areObjectsEqual = (obj1: any, obj2: any) => {
        //     return JSON.stringify(obj1) === JSON.stringify(obj2);
        // }

        // const isMatchTrue = (areObjectsEqual(obj1, obj2))

        if (ifExist) {
            const res = await transactionClient.personal_Info.update({
                where: {
                    id: ifExist.id
                },
                data: {...checkProperty}
            })
            return res
        } else {
            const res = await transactionClient.personal_Info.create({
                data: { ...checkProperty, user_id: payload.user_id }
            })
            return res
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
    });


    // const { ...resData } = payload.data.personalInfo
    // const res = await prisma.personal_Info.create({
    //     data: {
    //         ...resData, user_id: payload.user_id
    //     }
    // })
    return response
}

const getAll = async () => {
    const res = await prisma.personal_Info.findMany()
    return res
}

const getSingle = async (id: any) => {
    const res = await prisma.personal_Info.findFirst({
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
    return res
}

const deletePersonalInfo = async (id: any) => {
    const res = await prisma.personal_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updatePersonalInfo = async (id: any, payload: any) => {
    const res = await prisma.personal_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const PersonalInfoService = {
    create,
    getAll,
    getSingle,
    deletePersonalInfo,
    updatePersonalInfo
}