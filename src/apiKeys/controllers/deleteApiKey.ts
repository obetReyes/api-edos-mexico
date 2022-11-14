import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/client";
import tryCatch from "../../utils/tryCatch";


export const deleteApiKey = tryCatch(async(req:Request, res:Response) => {
    const {apikey} = req.params

    const apiKey = await prisma.aPIkeys.delete({
        where:{
            id:Number(apikey),
        }
    })
    if(apiKey){
        res.status(200).json({
            data:{
                details:"tu api key se ha eliminado correctamente"
            }       
        })
    }

})
