import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {
    const response = await prisma.$transaction(async transactionClient => {
        const checkProperty = payload.data.professionalInfo
        const ifExist = await transactionClient.professional_Info.findFirst({
            where: {
                user_id:payload.user_id
            }
        })

        if(ifExist){
            const res = await prisma.professional_Info.update({
                where:{
                    id:ifExist.id 
                },
                data:{...checkProperty}
            })
            return res
        }else{
            const res = await prisma.professional_Info.create({
                data:{ ...checkProperty, user_id: payload.user_id}
            })
            return res
        }
      
    })
    return response
}

const getAll = async () => {
    const res = await prisma.professional_Info.findMany()
    return res
}

const getSingle = async (id: any) => {
   
    const res = await prisma.professional_Info.findFirst({
        where: {
            user_id: id
        },
        select:{
            income:true,
            occupation:true,
            occupation_description:true
        }
    });
    
    return res
}

const deleteProfessionalInfo = async (id: any) => {
    const res = await prisma.professional_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateProfessionalInfo = async (id: any, payload: any) => {
    const res = await prisma.professional_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const ProfessionalInfoService = {
    create,
    getAll,
    getSingle,
    deleteProfessionalInfo,
    updateProfessionalInfo
}