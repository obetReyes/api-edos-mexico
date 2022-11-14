import {Request, Response } from "express";
import tryCatch from "../../utils/tryCatch";

export const createSignOUt =  tryCatch(async(req:Request, res:Response) => {
    res.cookie('access-token','',{
        maxAge:1,
        httpOnly:true,
        secure:true
    })
    res.status(200).json({
        "data":{
            details:"el usuario cerro su sesion"
        }
    })    
})

