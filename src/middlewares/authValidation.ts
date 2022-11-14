import {Request, Response, NextFunction} from "express"
//the auth validation middleware is used to  validate the yup schema , the yup shchema is used to check if  request coming from the body are right
export const authValidation = (schema:any) => async(req:Request, res:Response, next:NextFunction) => {
    const body = req.body
    try {
        await schema.validate(body, {abortEarly:false})
        return next() 
    } catch (error:any) {
        console.log(error.errors)
        return res.status(422).json({  errors:[
            
            {
            code:error.name,
            details:error.errors[0],
            href:""
            },
            {
                code:error.name,
                details:error.errors[1],
                href:""
            }
        ]})
       
    }

}

