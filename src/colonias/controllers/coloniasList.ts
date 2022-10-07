import { NextFunction, Request, Response } from "express"
import prisma from '../../../prisma/client'

export const coloniasList  = async(req:Request, res:Response, next:NextFunction) => {

    const {municipio:string} = req.params
    const encoded_municipio = encodeURIComponent(req.params.municipio).replace(/_/g, " ")

    
    try {
        const colonias = await prisma.colonias.findMany({
            where:{
                municipios:{
                    nombre:{
                        equals: encoded_municipio
                    }
                }
            },
            select:{
                nombre:true
            }
        })
        if(colonias.length  < 1){
            throw ('no existe un municipio con ese nombre')
        }
        return res.status(200).json({
            "data":{
                colonias
            }
        })
    } catch (error) {
        if(error === "no existe un municipio con ese nombre"){
            return res.status(404).json({
                 "error":{ 
                     error
                 }
             })
         }
        return res.status(400).json({
            "error":{
                error
            }
        })
    }
}