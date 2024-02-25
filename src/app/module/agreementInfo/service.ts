import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async(payload:any)=>{

  const response = await prisma.$transaction(async transactionClient => {
    const checkProperty = payload.data.agreementInfo


    const ifExist = await transactionClient.agreementInfo.findFirst({
        where: {
            user_id: payload.user_id
        }
    })
    if (ifExist) {
        const res = await transactionClient.agreementInfo.update({
            where:{
                id:ifExist.id 
            },
            data:{...checkProperty}
        })
        return res
    } else {
        const res = await transactionClient.agreementInfo.create({
          
            data:{ ...checkProperty, user_id: payload.user_id}
        })
        return res
    }
})

return response
}

const getAll = async()=>{
    const res = await prisma.agreementInfo.findMany()
    return res 
}

const getSingle = async(id:any)=>{
    const res = await prisma.agreementInfo.findFirst({
        where:{
            user_id:id 
        },
        select:{
            candidate_responsibility:true,
            information_truth:true,
            parents_aware:true
        }
    });
    return res 
}

const deleteAgreementInfo = async(id:any)=>{
    const res = await prisma.agreementInfo.delete({
        where:{
            id:id 
        }
    });
    return res 
}

const updateAgreementInfo = async(id:any,payload:any)=>{
    const res = await prisma.agreementInfo.update({
        where:{
            id:id 
        },
        data:payload
    });
    return res 
}

export const AgreementInfoService = {
    create,
    getAll,
    getSingle,
    deleteAgreementInfo,
    updateAgreementInfo
}