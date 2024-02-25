import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async(payload:any)=>{
    
    const response = await prisma.$transaction(async transactionClient=>{
        const checkProperty = payload.data.maritalInfo


        const ifExist = await transactionClient.marital_Info.findFirst({
            where: {
                user_id:payload.user_id
            }
        })

        if(ifExist){
          
            const res = await transactionClient.marital_Info.update({
                where:{
                    id:ifExist.id 
                },
                data:{...checkProperty}
            })
            return res
        }else{
            const res = await transactionClient.marital_Info.create({
                data:{ ...checkProperty, user_id: payload.user_id}
            })
            return res
        }
    })
    return response
}

const getAll = async()=>{
    const res = await prisma.marital_Info.findMany()
    return res 
}

const getSingle = async(id:any)=>{
    const res = await prisma.marital_Info.findFirst({
        where:{
            user_id:id 
        },
        select:{
            gift_from_brides_family:true,
            guardian_agree:true,
            job_after_marriage:true,
            marriage_thoughts:true,
            marriage_veil:true,
            resite_after_marriage:true,
            study_after_marriage:true,
        }
    });
    return res 
}

const deleteMaritalInfo = async(id:any)=>{
    const res = await prisma.marital_Info.delete({
        where:{
            id:id 
        }
    });
    return res 
}

const updateMaritalInfo = async(id:any,payload:any)=>{
    const res = await prisma.marital_Info.update({
        where:{
            id:id 
        },
        data:payload
    });
    return res 
}

export const MaritalInfoService = {
    create,
    getAll,
    getSingle,
    deleteMaritalInfo,
    updateMaritalInfo
}