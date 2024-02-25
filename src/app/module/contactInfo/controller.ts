import { NextFunction, Request, Response } from "express"
import { ContactInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ContactInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Contact info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ContactInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All contact info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ContactInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Contact info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteContactInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ContactInfoService.deleteContactInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Contact info delted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateContactInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await ContactInfoService.updateContactInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Contact info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const ContactInfoController = {
 create,
 getAll,
 getSingle,
 deleteContactInfo,
 updateContactInfo
   
}