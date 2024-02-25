import { NextFunction, Request, Response } from "express"
import { PersonalInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PersonalInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Personal info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PersonalInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All personal info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PersonalInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Personal info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deletePersonalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PersonalInfoService.deletePersonalInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Personal info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updatePersonalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PersonalInfoService.updatePersonalInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Personal info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const PersonalInfoController = {
 create,
 getAll,
 getSingle,
 deletePersonalInfo,
 updatePersonalInfo
   
}