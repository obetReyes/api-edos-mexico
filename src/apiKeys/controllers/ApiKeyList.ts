import {Request, Response } from "express"
import {AppError} from "../../utils/AppError";
import prisma from "../../../prisma/client";
import tryCatch from "../../utils/tryCatch";


export const apiKeyList = tryCatch(async(req:Request, res:Response) => {
    const {email} = req.body
    const apiKeys = await prisma.aPIkeys.findMany({
        where:{
            usuarioEmail:email
        },
        select:{
            id:true,
            value:true
        }
    })
    
    if(apiKeys){
        res.status(200).json({
            data:{
            
                    apiKeys
                }
            
            })
    }else{
        throw  new AppError("error_obtener_api_keys", "no hay api keys desponibles, debes crear una primero.", "", 400)
    }
})
