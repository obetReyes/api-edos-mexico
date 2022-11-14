import { Response, Request, NextFunction } from "express";
import {AppError} from "../utils/AppError";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';




const errorHandler = async(error:any, req:Request, res:Response, next:NextFunction) => {
    
    
    if(error instanceof AppError){
        return res.status(error.statusCode ?? 400).json({
            errors:[
                {
                code:error.errorCode,
                details:error.message || "error desconocido",
                href:error.href
                }
            ]
        })
    }
    
    if (error instanceof PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
            return res.status(409).json({
                errors:[
                    {
                    code:"error_credenciales_duplicadas",
                    details:"las credenciales ya estan tomadas",
                    href:"https://infomexico/listerror.fly.dev"
                }
                ]
            })
        }
    }
    console.log(error)
    return res.status(500).json({
        errors:[
            {
            code:error.errorCode,
            details:error.message || "error desconocido",
            href:error.href
            }
        ]
    });

}


export default errorHandler;