import { Request, Response } from "express"
import prisma from '../../../prisma/client'
import tryCatch from "../../utils/tryCatch"

export const EstadosList = tryCatch(async (req: Request, res: Response) => {
    const estados = await prisma.estados.findMany({
        select: {
            id: true,
            nombre: true
        }
    })

    return res.status(200).json({
        "data": {
            estados
        }
    })

})
