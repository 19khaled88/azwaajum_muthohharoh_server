import { NextFunction, Request, Response } from "express"
import { GeneralInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await GeneralInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "General infomation saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await GeneralInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "General informaton retrieved",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await GeneralInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Single general infomation retrieved",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteGeneralInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const res = await GeneralInfoService.deleteGeneralInfo(req.params.id)
    } catch (error) {
        next(error)
    } 
}

const updateGeneralInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const res = await GeneralInfoService.updateGeneralInfo(req.params.id, req.body)
    } catch (error) {
        next(error)
    } 
}




export const GeneralInfoController = {
 create,
 getAll,
 getSingle,
 deleteGeneralInfo,
 updateGeneralInfo
   
}