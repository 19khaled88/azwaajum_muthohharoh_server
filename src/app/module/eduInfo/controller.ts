import { NextFunction, Request, Response } from "express"
import { EduInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await EduInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Education info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await EduInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All education info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await EduInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Single education info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteEduInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await EduInfoService.deleteEduInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Education info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateEduInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await EduInfoService.updateEduInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Education info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const EduInfoController = {
 create,
 getAll,
 getSingle,
 deleteEduInfo,
 updateEduInfo
   
}