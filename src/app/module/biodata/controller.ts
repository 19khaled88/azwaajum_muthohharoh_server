import { NextFunction, Request, Response } from "express"
import { BioDataService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationFields } from "../../../shared/paginationFields"



const create =async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.create(req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Bio info saved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getAll = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.getAll()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "All bio info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getApproved = async(req:Request, res:Response,next:NextFunction)=>{
    try {

        const result = await BioDataService.getApproved()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Approved bio info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getPending = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.getPending()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Pending bio info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getRejected = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.getRejected()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Rejected bio info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const frontEndShow = async(req:Request, res:Response,next:NextFunction)=>{
    
    try {
        const filterOptions = pick(req.query, ['pre_district', 'per_district', 'candidate','age','marital_status','special'])
        const paginationOptions = pick(req.query, paginationFields)
        const result = await BioDataService.frontEndShow(paginationOptions,filterOptions)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "List of retrieved Bio data",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const getSingle = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.getSingle(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Bio info retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteBioData = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.deleteBioData(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Bio info deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}

const updateBioData = async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const result = await BioDataService.updateBioData(req.params.id, req.body)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Bio info updated successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    } 
}




export const BioDataController = {
 create,
 getAll,
 getSingle,
 deleteBioData,
 updateBioData,
 getApproved,
 getPending,
 getRejected,
 frontEndShow
   
}