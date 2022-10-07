import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';


export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    
    const host ='http://localhost:3001'
    const api_key_value = req.query.api_key
    const api_key_to_string = String(api_key_value)
    try {
        
        let is_user_apiKey = await prisma.aPIkeys.findUnique({
            where: {
                value: String(api_key_value)
            }
        })
        
        if (!is_user_apiKey) {
            
    
            throw ('la api key no es valida')
    
        }
       else {
        if (String(host) === is_user_apiKey.host) {
        
            let today = new Date().toISOString().split('T')[0];
            if(is_user_apiKey.usage === today){
                if (is_user_apiKey.count > 0) {
                    if(is_user_apiKey.count > 300){
                        return res.status(429).json({
                            error: {
                                error: "has rebasado el limite de 300 llamadas a la api por dia"
                            }
                        })
                    } else{
                        await prisma.aPIkeys.update({
                            where:{
                                value:String(api_key_value)
                            },
                             data:{
                                usage:today,
                                count:{
                                    increment:1
                                }
                             }
                        })
                        console.log('good api call', is_user_apiKey.count)
                        return next()
                    }
                      
                }
            }else{
                await prisma.aPIkeys.update({
                    where: {
                        value: String(api_key_value),
                      },
                      data: {
                        usage:today,
                        count:{
                            increment:1
                        }
                      },
                })
            }
            console.log('good api call', is_user_apiKey.count)
            return next()
        }
        }
    } catch (error: any) {
        return res.status(401).json({
            error: {
                error: error.message || error
            }
        })
    }
}
