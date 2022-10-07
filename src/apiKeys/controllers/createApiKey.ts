import { NextFunction, Request, Response } from "express"
import prisma from "../../../prisma/client";
import apiKeyGenerator from "../helpers/apiKeygenerator"

    const api_key_value = apiKeyGenerator()

export const createApiKey = async(req:Request, res:Response, next:NextFunction) => {
    const {email} = req.body
    let today = new Date().toISOString().split('T')[0];

    try {
            const apiKey = await prisma.aPIkeys.create({
                data:{
                host:'http://localhost:3001',
                value:api_key_value,
                usage:today,
                count:0,
                usuarioEmail:req.body.email,
                }
            })
            if(apiKey){
                res.status(200).json({
                    data:{
                        info:api_key_value
                    }})
            }else{
                throw('no se pudo generar la api key')
            }  
    } catch (error:any) {
        res.status(400).json({
            error:{
                error:error.message || "error desconocido"
            }
        })
    }
}

