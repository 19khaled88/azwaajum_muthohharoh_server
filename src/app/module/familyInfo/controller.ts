import { NextFunction, Request, Response } from "express"
import { FamilyInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"




const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await FamilyInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Family info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await FamilyInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All family info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await FamilyInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Family info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteFamilyInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await FamilyInfoService.deleteFamilyInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Family info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateFamilyInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await FamilyInfoService.updateFamilyInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Family info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const FamilyInfoController = {
 create,
 getAll,
 getSingle,
 deleteFamilyInfo,
 updateFamilyInfo
   
}