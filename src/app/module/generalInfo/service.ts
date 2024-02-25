import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {
    const response = await prisma.$transaction(async transactionClient => {
        const isExist = await transactionClient.general_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        })
    

        let obj1 = payload.data.generalInfo
        let obj2 = isExist

        const areObjectsEqual = (obj1: any, obj2: any) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        const isMatchTrue = (areObjectsEqual(obj1, obj2))

        
        if (isExist && !isMatchTrue) {
            const { birth_date, user_id, id, ...allRest } = payload.data.generalInfo
            const isoFormattedDate = new Date(birth_date).toISOString();

            const res = await prisma.general_Info.update({
                where: {
                    id: isExist.id
                },
                data: { ...allRest, birth_date: isoFormattedDate }
            })
            return res
        } if (isExist && isMatchTrue) {
            return {
                res: 'Nothing changed'
            }
        } else {
            const { birth_date, ...allRest } = payload.data.generalInfo
           
            const isoFormattedDate = new Date(birth_date).toISOString();
            const res = await prisma.general_Info.create({
                data: { ...allRest, birth_date: isoFormattedDate, user_id: payload.user_id }
            })
            return res
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
    })
    return response
    // const { birth_date, ...allRest } = payload.data.generalInfo
    // const isoFormattedDate = new Date(birth_date).toISOString();
    // const res = await prisma.general_Info.create({
    //     data: { ...allRest, birth_date: isoFormattedDate, user_id: payload.userId }
    // })
    // return res
}

const getAll = async () => {
    const res = await prisma.general_Info.findMany()
    return res
}

const getSingle = async (id: any) => {

    const res = await prisma.general_Info.findFirst({
        where: {
            user_id: id
        }
    });
    return res
}

const deleteGeneralInfo = async (id: any) => {
    const res = await prisma.general_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateGeneralInfo = async (id: any, payload: any) => {
    const res = await prisma.general_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const GeneralInfoService = {
    create,
    getAll,
    getSingle,
    deleteGeneralInfo,
    updateGeneralInfo
}