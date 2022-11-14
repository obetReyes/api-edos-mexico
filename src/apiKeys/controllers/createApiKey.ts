// this module uses the  api key generator to generate an value for the api key, the api key needs to be used  inside every api call to verify if the user can get the data from the endpoint

import { Request, Response } from "express"
import prisma from "../../../prisma/client";
import tryCatch from "../../utils/tryCatch";
import { AppError } from "../../utils/AppError";
import apiKeyGenerator from "../helpers/apiKeygenerator"

export const createApiKey =  tryCatch(async(req:Request, res:Response) => {
  const {email} = req.body;
  
  const apiKeysList = await prisma.aPIkeys.findMany({
    where: {
        usuarioEmail: email
    }
})
if (apiKeysList.length < 3) {
    const apiKey = await prisma.aPIkeys.create({
        data: {
            host: 'http://localhost:3001',
            value: apiKeyGenerator(),
            usuarioEmail: email,
        }
    })
    if (apiKey) {
        res.status(201).json({
            data: {
                details: "se ha creado una nueva api key"
            }
        })
    } else {
        throw new AppError("error_credenciales_api_key",'no se pudo generar la api key debido a que las credenciales no son validas',"",403)
    }
}else{
    throw new AppError("error_limite_excedido_de_api_keys","solo puedes tener 3 api keys al mismo tiempo.", "",409)
}
})
