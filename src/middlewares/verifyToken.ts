import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from 'dotenv' 
dotenv.config()


  
const secret:string = process.env.SECRET_JWT ?? ""
//the middleware verifies the jwt token
export const verifyToken = (req:any, res:Response, next:NextFunction) => {
     
    const acess_token = req.cookies["access-token"]
    if(!acess_token){
        return res.status(403).json({
            errors:[
                {
                code:"error_de_autenticacion",
                details:"no se ha podido autenticar al usuario",
                href:""
                }
            ]})
    }
    try {
        const valid_token = verify(acess_token,  secret,{
            algorithms:['HS256']
        })
        if(valid_token){
            req.authenticated = true
         return   next()
        }
    } catch (error:any) {
        console.log(error)
        return res.status(403).json({
            errors:[
                {
                code:error.name,
                details:error.message,
                href:""
                }
            ]
        })      
    }


}