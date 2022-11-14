//signup module  here we are creating  the will generate jwt toke as authorization
import { Request, Response } from "express";
import prisma from '../../../prisma/client'
import tryCatch from "../../utils/tryCatch";
import { createToken } from "../../utils/jwt";
import bcrypt from 'bcrypt';


export const createSignUp = tryCatch(async(req:Request, res:Response) => {
    const { email, password } = req.body  
    const hash = await bcrypt.hash(password, 10);
    const signUpUser = await prisma.usuarios.create({
        data: {
            email: email,
            hash: hash,
        }
    })
    
    const acess_token = createToken(signUpUser)
        //the acess token will be stored inside a http only cookie
        res.cookie('access-token', acess_token, {
            maxAge: 2 * 60 * 24 * 30 * 1000,
            httpOnly:true,

        })

        return res.status(201).json({
            "data": {
             details:"nuevo usuario registrado"
            }
        })

})

