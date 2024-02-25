import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {

    const response = await prisma.$transaction(async transactionClient => {
        const checkProperty = payload.data.partnerInfo

        const ifExist = await transactionClient.partner_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        })

        if (ifExist) {
            
            const res = await transactionClient.partner_Info.update({
                where:{
                    id:ifExist.id 
                },
                data:{...checkProperty}
            })
            return res
        } else {
            const res = await transactionClient.partner_Info.create({
              
                data:{ ...checkProperty, user_id: payload.user_id}
            })
            return res
        }
    })

    return response

}

const getAll = async () => {
    const res = await prisma.partner_Info.findMany()
    return res
}

const getSingle = async (id: any) => {
    const res = await prisma.partner_Info.findFirst({
        where: {
            user_id: id
        },
        select: {
            complexion: true,
            district: true,
            edu_qualification: true,
            expected_Qualities: true,
            financial_condition: true,
            marital_status: true,
            profession: true,
            height: true
        }
    });
    return res
}

const deletePertnarInfo = async (id: any) => {
    const res = await prisma.partner_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updatePertnarInfo = async (id: any, payload: any) => {
    const res = await prisma.partner_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const PertnarInfoService = {
    create,
    getAll,
    getSingle,
    deletePertnarInfo,
    updatePertnarInfo
}