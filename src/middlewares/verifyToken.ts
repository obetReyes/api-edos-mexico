import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export const verifyToken = (req:any, res:Response, next:NextFunction) => {
     
    const acess_token = req.cookies["access-token"]
    if(!acess_token){
        return res.status(403).json({
            error:"no se ha podido autenticar al usuario"
        })
    }
    try {
        const valid_token = verify(acess_token, "secretplschange",{
            // Never forget to make this explicit to prevent
            algorithms:['HS256']
        })
        if(valid_token){
            req.authenticated = true
         return   next()
        }
    } catch (error) {
        return res.status(403).json({
            "error":{
                error
            }
        })      
    }


}