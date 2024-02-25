import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const create = async (payload: any) => {

    const response = await prisma.$transaction(async transactionClient => {
        const { ssc_year, top_degree_pass_year, ...resData } = payload.data.educationalInfo
        const isExist = await transactionClient.educational_Info.findFirst({
            where: {
                user_id: payload.user_id
            }
        })

        const parsedSscYear = ssc_year ? parseInt(ssc_year) : undefined;
        const parsedTopDegreePassYear = top_degree_pass_year ? parseInt(top_degree_pass_year) : undefined;

        if (!isExist) {
            const res = await transactionClient.educational_Info.create({

                data: {
                    ...resData,
                    // Include parsed integer values in the create data
                    ssc_year: parsedSscYear,
                    top_degree_pass_year: parsedTopDegreePassYear,
                    user_id: payload.user_id
                }

                // data: top_degree_pass_year ?
                //     { ...resData, ssc_year: parseInt(ssc_year), top_degree_pass_year: parseInt(top_degree_pass_year), user_id: payload.userId } :
                //     { ...resData, ssc_year: parseInt(ssc_year), user_id: payload.userId }
            })
            return res
        } else {
            const updateData = { ...resData };
            if (parsedSscYear !== undefined) {
                updateData.ssc_year = parsedSscYear;
            }
            if (parsedTopDegreePassYear !== undefined) {
                updateData.top_degree_pass_year = parsedTopDegreePassYear;
            }

            // Remove the 'id' property from updateData
            delete updateData.id;

            const res = await transactionClient.educational_Info.update({
                where: {
                    id: isExist.id
                },
                data: updateData
            })
            return res
        }


    })
    return response
}

const getAll = async () => {
    const res = await prisma.educational_Info.findMany()
    return res
}

const getSingle = async (id: any) => {
    const res = await prisma.educational_Info.findFirst({
        where: {
            user_id: id
        }
    });
    return res
}

const deleteEduInfo = async (id: any) => {
    const res = await prisma.educational_Info.delete({
        where: {
            id: id
        }
    });
    return res
}

const updateEduInfo = async (id: any, payload: any) => {
    const res = await prisma.educational_Info.update({
        where: {
            id: id
        },
        data: payload
    });
    return res
}

export const EduInfoService = {
    create,
    getAll,
    getSingle,
    deleteEduInfo,
    updateEduInfo
}