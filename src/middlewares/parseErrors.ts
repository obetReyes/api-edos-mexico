import {Request, Response, NextFunction, ErrorRequestHandler} from "express"

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
        return res.status(400).json({error:error.message})
    }

}

