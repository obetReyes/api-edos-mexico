import { NextFunction, Request, Response } from "express";

export const createSignOUt  = async(req: Request, res: Response, next: NextFunction) => {
 try {
    res.cookie('access-token','',{
        maxAge:1,
        httpOnly:true
    })
    res.status(200).json({
        "data":{
            info:"el usuario cerro su sesion"
        }
    })
 } catch (error) {
   res.status(400).json({
    "error":{
        error
    }
   }) 
 }   
}