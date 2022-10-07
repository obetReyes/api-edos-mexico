import { NextFunction, Request, Response } from "express";
import prisma from '../../../prisma/client'
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createToken } from "../../utils/jwt";


export const createSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    bcrypt.hash(password, 10).then(async (hash) => {
        const signUpUser = await prisma.usuarios.create({
            data: {
                email: email,
                hash: hash,
            }
        })

        
        const acess_token = createToken(signUpUser)
        res.cookie('access-token', acess_token, {
            maxAge: 60 * 60 * 24 * 30 * 1000
        })

    }).then(() => {
        res.status(200).json({
            "data": {
                info: "nuevo usuario registrado"
            }
        })
    }).catch((error) => {
        if (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    error = "las credenciales ya estan tomadas"
                }
            }

            if (error === "las credenciales ya estan tomadas") {
                res.status(409).json({
                    "error": {
                        error: error
                    }
                })
            } else {
                console.log(error)
                res.status(400).json({
                    "error": {
                        error: error
                    }
                })
            }
        }
    })

}