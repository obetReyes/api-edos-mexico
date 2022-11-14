import {Request, Response, NextFunction, ErrorRequestHandler} from "express"

//this middelware sends an error if the required json is not valid
export const parseErrors = async(error:ErrorRequestHandler,req:Request, res:Response, next:NextFunction) => {
    const body = req.body
    try {
        if(error instanceof SyntaxError || error instanceof TypeError){ 
            throw error
        }
        else{
            return next()
        }
    } catch (error:any) {
        return res.status(400).json({  errors:[
            {
            code:error.name,
            details:error.message,
            href:""
            }
        ]})
    }

}

