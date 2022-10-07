import { NextFunction, Request, Response } from "express";
import { decode} from "jsonwebtoken";


export const readUser = async(req:Request, res:Response, next:NextFunction) => {
    const acess_token = req.cookies["access-token"]
    try {
        const decoded:any = decode(acess_token)
        if(decoded.useremail === null){
            throw("el usuario no existe encontrado")

        }
        res.status(200).json({
            data:{
                email:decoded.useremail
            }
        })

    } catch (error) {
        res.status(400).json({error:error
    })
    }
}