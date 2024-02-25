import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {

    const response = await prisma.$transaction(async transactionClient => {
        const checkProperty = payload.data.contactInfo

        const ifExist = await transactionClient.contactInfo.findFirst({
            where: {
                user_id: payload.user_id
            }
        })
        const bioExist = await transactionClient.bio_data.findFirst({
            where: {
                user_id: payload.user_id
            }
        })
        if (ifExist) {
            const res = await transactionClient.contactInfo.update({
                where: {
                    id: ifExist.id
                },
                data: { ...checkProperty }
            })
            return res
        } else {
            const res = await transactionClient.contactInfo.create({

                data: { ...checkProperty, user_id: payload.user_id }
            })
            await transactionClient.bio_data.update({
                where: {
                    id: bioExist?.id
                },
                data: {
                    make: 'YES'
                }
            })
            return res
        }
    })

    return response
}

const getAll = async () => {
    const res = await prisma.contactInfo.findMany()
    return res
}

const getSingle = async (id: any) => {
    const res = await prisma.contactInfo.findFirst({
        where: {
            user_id: id
        },
        select: {
            candidate_name: true,
            email_address: true,
            guardian_relationship: true,
            gurdian_mobile: true
        }
    });
    return res
}

const deleteContactInfo = async (id: any) => {
    const res = await prisma.contactInfo.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateContactInfo = async (id: any, payload: any) => {
    const res = await prisma.contactInfo.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const ContactInfoService = {
    create,
    getAll,
    getSingle,
    deleteContactInfo,
    updateContactInfo
}