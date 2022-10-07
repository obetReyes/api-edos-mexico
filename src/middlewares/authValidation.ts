import {Request, Response, NextFunction} from "express"
import * as yup from 'yup';
export const authValidation = (schema:any) => async(req:Request, res:Response, next:NextFunction) => {
    const body = req.body
    try {
        await schema.validate(body, {abortEarly:false})
        return next() 
    } catch (error:any) {
        return res.status(422).json({error:error.errors})
    }

}

