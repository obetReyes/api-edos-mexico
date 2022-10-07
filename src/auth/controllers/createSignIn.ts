import { NextFunction, Request, Response } from "express";
import prisma from '../../../prisma/client'
import { createToken } from "../../utils/jwt";
import bcrypt from "bcrypt"


export const createSignin = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const signInUser =  await prisma.usuarios.findUnique({
            where: {
              email: email,
            },
          })
          if(!signInUser) {
            throw('las credenciales so invalidas')
          }
          const storedHash = signInUser.hash

            bcrypt.compare(password, storedHash).then((match) => {
            if(!match){
                throw('las credenciales son invalidas')
            }else{
              const acess_token = createToken(signInUser)
           res.cookie('access-token', acess_token, {
              
            maxAge:7*24*60*60*1000,
          httpOnly:true          
        })
          console.log(acess_token)
                res.status(200).json({"data":{info:'el usuario ha iniciado sesion'}})
            }
          })
    .catch ((error) => {
        res.status(401).json({error:error})       
    })    
    } catch (error) {
        res.status(401).json({error:error})  
    }
}