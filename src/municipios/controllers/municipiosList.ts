import { NextFunction, Request, Response } from "express"
import prisma from '../../../prisma/client'


export const municipiosList  = async(req:Request, res:Response, next:NextFunction) => {
    const {estado:string} = req.params
    const encoded_estado = encodeURI(req.params.estado).replace(/_/g, " ")

    try {
        const municipios = await prisma.municipios.findMany({
            where:{
                estados:{
                    nombre:{
                        equals:encoded_estado
                    }
                }
            },
            select:{
                nombre:true
            }
        })
        if(municipios.length  < 1){
            throw ('no existe un estado con ese nombre')
        }
        return res.status(200).json({
            "data":{
                municipios
            }
        })   
    } catch (error) {
        console.log(error)
        if(error === 'no existe un estado con ese nombre'){
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
   