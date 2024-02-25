import { NextFunction, Request, Response } from "express"
import { AddressInfoService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    
    try {
        const result = await AddressInfoService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Address saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
   
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AddressInfoService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Addresses retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AddressInfoService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Address retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteAddressInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AddressInfoService.deleteAddressInfo(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Addresse for given ID deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateAddressInfo = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await AddressInfoService.updateAddressInfo(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Address for given ID deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const AddressInfoController = {
 create,
 getAll,
 getSingle,
 deleteAddressInfo,
 updateAddressInfo
   
}