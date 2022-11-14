
import { Request, Response } from "express";
import prisma from '../../../prisma/client'
import tryCatch from "../../utils/tryCatch";
import { AppError } from "../../utils/AppError";
import { createToken } from "../../utils/jwt";
import bcrypt from "bcrypt"


export const createSignin = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const signInUser = await prisma.usuarios.findUnique({
    where: {
      email: email,
    },
  })
  if (!signInUser) {
    throw new AppError('error_de_ingreso', 'las credenciales son invalidas', "", 401)
  }
  const storedHash = signInUser.hash

  const matches = await bcrypt.compare(password, storedHash);

  if (matches) {
    const acess_token = createToken(signInUser)

    res.cookie('access-token', acess_token, {

      maxAge: 2 * 60 * 24 * 30 * 1000,
      httpOnly: true
    })
    
    res.status(200).json({ "data": { details: 'el usuario ha iniciado sesion' } })

  } else {
    throw new AppError('error_de_ingreso', 'las credenciales son invalidas', "", 401)
  }

})
