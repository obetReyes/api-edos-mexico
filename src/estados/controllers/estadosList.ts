import { NextFunction, Request, Response } from "express"
import prisma from '../../../prisma/client'


export const EstadosList  = async(req:Request, res:Response, next:NextFunction) => {
    const NAMESPACE:string = 'estados'
    try {
        const estados = await prisma.estados.findMany({
            select:{
                nombre:true
            }
        })

        return res.status(200).json({
            "data":{

                estados
            }
        })   
    } catch (error) {
        return res.status(400).json({
            "error":{
                error
            }
        })
    }
}
   
