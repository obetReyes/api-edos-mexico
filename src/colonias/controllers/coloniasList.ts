import { Request, Response } from "express"
import { AppError } from "../../utils/AppError"
import prisma from '../../../prisma/client'
import tryCatch from "../../utils/tryCatch"


export const coloniasList = tryCatch(async (req: Request, res: Response) => {

    const { municipio, estado } = req.params

    const encoded_municipio = encodeURIComponent(req.params.municipio).replace(/_/g, " ")
    const encoded_estado = encodeURIComponent(req.params.estado).replace(/_/g, " ")


   

    const colonias = await prisma.colonias.findMany({
        where:{
            
            municipios:{
                
                nombre:{
                    equals:encoded_municipio
                },
                estados:{
                    nombre:{
                        endsWith:encoded_estado
                    }
                }
              
            }
        },
        select:{
            id:true,
            nombre:true
        }
    })


    
    if (colonias.length < 1) {
        throw new AppError('error_municipio_encontrado', 'no existe un municipio con ese nombre', "", 404)
    }else{
        console.log(colonias)
    }
    return res.status(200).json({
        "data": {
            colonias
        }
    })
    
    
    /*

  let correct_estado:any = []
    
  estados?.municipios.forEach( async(mcpio) => {
        
        if(mcpio.nombre.toLocaleLowerCase() == municipio)
        {
          console.log(correct_estado)
            return correct_estado.push(mcpio.id)
    
        }
    })

    const municipios =  await prisma.municipios.findUnique({
        where:{
            id:correct_estado[0]
        }
    })


        const correct_colonias = await prisma.colonias.findMany({
            where:{
                nombre:encoded_municipio,
                id:correct_estado
            },
            include:{
                municipios:true
            }
        })
    
        await console.log(correct_colonias)
        const colonias = await prisma.colonias.findMany({
            where:{
                nombre:encoded_municipio,
                municipios:{
                    id:correct_estado[0]
                }
            }
        })
       
    
*/    
    
});
