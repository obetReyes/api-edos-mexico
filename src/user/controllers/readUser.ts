import { NextFunction, Request, Response } from "express";
import { decode} from "jsonwebtoken";

//the read user controllers belongs to the usuarios  router where we can get info from the current user.
export const readUser = async(req:Request, res:Response, next:NextFunction) => {
    const acess_token = req.cookies["access-token"]
    try {
        const decoded:any = decode(acess_token)
        if(decoded.useremail === null){
            throw new Error("el usuario no existe encontrado")

        }
        res.status(200).json({
            data:{
                details:decoded.useremail
            }
        })

    } catch (error:any) {
        res.status(400).json({errors:[
            {
            code:"error_de_verificacion",
            details:error.message || "error.desconocido",
        }
        ]
    })
    }
}