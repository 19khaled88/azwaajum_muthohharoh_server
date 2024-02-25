import { NextFunction, Request, Response } from "express"
import { PertnarInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PertnarInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Pertner info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PertnarInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All pertner info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PertnarInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Pertner info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deletePertnarInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PertnarInfoService.deletePertnarInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Pertner info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updatePertnarInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await PertnarInfoService.updatePertnarInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Pertner info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const PertnarInfoController = {
 create,
 getAll,
 getSingle,
 deletePertnarInfo,
 updatePertnarInfo
   
}