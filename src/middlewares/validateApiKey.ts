import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';



// in this module we are checking if the api key is valid we get the api key from the user and check if it belongs to the current user 
export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    
    const api_key_value = req.header('x-api-key')
    
    if(!api_key_value){
        return res.status(401).json({
            errors: [
                {
                    code:"error_api_key",
                    details:"la api key no fue incluida en la peticion",
                    href:"https://infomexico/#errores.fly.dev"
                }
            ]
        })
    }
    
    try {
        
        let is_user_apiKey = await prisma.aPIkeys.findUnique({
            where: {
                value: String(api_key_value)
            }
        })
        if(is_user_apiKey){
            return next()
        }
        if (!is_user_apiKey) {
            throw new Error('la api key es invalida')
    
        }
        }
    catch (error: any) {
        return res.status(401).json({
            errors: [
                {
                    code:"error_api_key",
                    details:error.message || error,
                    href:"https://infomexico/#errores.fly.dev"
                }
            ]
        })
    }
}
