import { Request, Response } from "express"
import { AppError } from "../../utils/AppError"
import prisma from '../../../prisma/client'
import tryCatch from "../../utils/tryCatch"

export const municipiosList = tryCatch(async (req: Request, res: Response) => {

    const { estado: string } = req.params
    const encoded_estado = encodeURI(req.params.estado).replace(/_/g, " ")

    const municipios = await prisma.municipios.findMany({
        where:{
            estados:{
                nombre:{
                    equals:encoded_estado
                }
            }
        }
    })
    console.log(encoded_estado)
    if (municipios.length < 1) {
        throw new AppError("error_estado_no_encontrado",'no existe un estado con ese nombre',"https://infomexico/listerror.fly.dev",404)
    }

    return res.status(200).json({
        "data": {
            municipios
        }
    })
})
