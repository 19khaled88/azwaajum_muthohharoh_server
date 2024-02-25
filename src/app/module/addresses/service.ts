import { PrismaClient } from "@prisma/client"
import ApiError from "../../../errors/apiError"


const prisma = new PrismaClient()

const create = async (payload: any) => {
    const { present_address, permanent_address } = payload.data.address
    const result = await prisma.$transaction(async transactionClient => {

        const isPresentAddressExist = await transactionClient.present_address.findFirst({
            where: {
                user_id: payload.user_id
            }
        })
        const isPermanentAddressExist = await transactionClient.permanent_address.findFirst({
            where: {
                user_id: payload.user_id
            }
        })

        const areObjectsEqual = (obj1: any, obj2: any) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        const isPresentAddressMatchTrue = areObjectsEqual(isPresentAddressExist, payload.data.address.present_address)
        const isPermanentAddressMatchTrue = areObjectsEqual(isPermanentAddressExist, payload.data.address.permanent_address)
        // console.log(isPresentAddressMatchTrue,isPermanentAddressMatchTrue)
        if (!isPresentAddressExist && !isPermanentAddressExist) {
            const present_add = await transactionClient.present_address.create({
                data: { ...present_address, user_id: payload.user_id }
            })

            const permanent_add = await transactionClient.permanent_address.create({
                data: { ...permanent_address, user_id: payload.user_id }
            })

            if (present_add && permanent_add) {
                return { present_add, permanent_add }
            } else {
                throw new ApiError(400, 'Address not saved!!')
            }
        }
        else if (isPresentAddressExist && isPermanentAddressExist && !isPresentAddressMatchTrue && isPermanentAddressMatchTrue) {
            const { id, user_id, ...resAddress } = payload.data.address.present_address
            const res = await transactionClient.present_address.update({
                where: {
                    id: isPresentAddressExist.id
                },
                data: { ...resAddress }
            })
            return res

        } else if (isPresentAddressExist && isPermanentAddressExist && isPresentAddressMatchTrue && !isPermanentAddressMatchTrue) {
            const { id, user_id, ...resAddress } = payload.data.address.permanent_address
            const res = await transactionClient.permanent_address.update({
                where: {
                    id: isPermanentAddressExist.id
                },
                data: { ...resAddress }
            })
            return res

        } else if (isPresentAddressExist && isPermanentAddressExist && !isPresentAddressMatchTrue && !isPermanentAddressMatchTrue) {

            const present_add = await transactionClient.present_address.update({
                where: {
                    id: isPresentAddressExist.id
                },
                data: payload.data.present_address
            })

            const permanent_add = await transactionClient.permanent_address.update({
                where: {
                    id: isPermanentAddressExist.id
                },
                data: payload.data.permanent_address
            })
            if (present_add && permanent_add) {
                return { present_add, permanent_add }
            } else {
                throw new ApiError(400, 'Address not saved!!')
            }
        } else if (isPresentAddressExist && isPermanentAddressExist && isPresentAddressMatchTrue && isPermanentAddressMatchTrue) {
            return {
                data: 'All are updated'
            }
        }

        // const present_add = await transactionClient.present_address.create({
        //     data: {...present_address,user_id:payload.userId}
        // })

        // const permanent_add = await transactionClient.permanent_address.create({
        //     data: {...permanent_address,user_id:payload.userId}
        // })

        // if (present_add && permanent_add) {
        //     return { present_add, permanent_add }
        // }else{
        //     throw new ApiError(400,'Address not saved!!')
        // }
    })
    return result
}

const getAll = async () => {
    const result = await prisma.$transaction(async transactionClient => {
        const present_add = await transactionClient.present_address.findMany()
        const permanent_add = await transactionClient.permanent_address.findMany()
        if (present_add && permanent_add) {
            return { present_add, permanent_add }
        }
    })
    return result
}

const getSingle = async (id: any) => {
   
    const result = await prisma.$transaction(async transactionClient => {
        const present_address = await transactionClient.present_address.findFirst({
            where: {
                user_id: id
            }
            // select:{
            //     district:true,
            //     division:true,
            //     post_office:true,
            //     sub_district:true,
            //     village:true
            // }
        });

        const permanent_address = await transactionClient.permanent_address.findFirst({
            where: {
                user_id: id
            }
            // select:{
            //     district:true,
            //     division:true,
            //     post_office:true,
            //     sub_district:true,
            //     village:true
            // }
        });

        if (present_address && permanent_address) {
            return { present_address, permanent_address }
        }
    })

    return result
}

const deleteAddressInfo = async (id: any) => {
    const result = await prisma.$transaction(async transactionClient => {
        const present_add = await prisma.present_address.delete({
            where: {
                id: id
            }
        });

        const permanent_add = await prisma.present_address.delete({
            where: {
                id: id
            }
        });

        if (present_add && permanent_add) {
            return { present_add, }
        }
    })

    return result
}

const updateAddressInfo = async (id: any, payload: any) => {

    const result = await prisma.$transaction(async transactionClient => {
        const present_add = await prisma.present_address.update({
            where: {
                id: id
            },
            data: payload
        });

        const permanent_add = await prisma.present_address.update({
            where: {
                id: id
            },
            data: payload
        });

        if (present_add && permanent_add) {
            return { present_add, }
        }
    })

    return result
}

export const AddressInfoService = {
    create,
    getAll,
    getSingle,
    deleteAddressInfo,
    updateAddressInfo
}