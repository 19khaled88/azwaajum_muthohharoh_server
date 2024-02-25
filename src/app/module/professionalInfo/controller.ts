import { NextFunction, Request, Response } from "express"
import { ProfessionalInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ProfessionalInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Professional info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ProfessionalInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All professional info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ProfessionalInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Professional info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteProfessionalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ProfessionalInfoService.deleteProfessionalInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Professional info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateProfessionalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ProfessionalInfoService.updateProfessionalInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Professional info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const ProfessionalInfoController = {
 create,
 getAll,
 getSingle,
 deleteProfessionalInfo,
 updateProfessionalInfo
   
}