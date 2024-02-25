import { NextFunction, Request, Response } from "express"
import { AgreementInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AgreementInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Agreement info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AgreementInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All agreement info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AgreementInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Agreement info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteAgreementInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AgreementInfoService.deleteAgreementInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Agreement info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateAgreementInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AgreementInfoService.updateAgreementInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Agreement info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const AgreementInfoController = {
 create,
 getAll,
 getSingle,
 deleteAgreementInfo,
 updateAgreementInfo
   
}