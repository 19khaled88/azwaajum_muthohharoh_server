import { NextFunction, Request, Response } from "express"
import { MaritalInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await MaritalInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Marital info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await MaritalInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All marital info retrievevd successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await MaritalInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Marital info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteMaritalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await MaritalInfoService.deleteMaritalInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Marital info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateMaritalInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await MaritalInfoService.updateMaritalInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Marital info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const MaritalInfoController = {
 create,
 getAll,
 getSingle,
 deleteMaritalInfo,
 updateMaritalInfo
   
}