import express, {Request, Response, NextFunction} from 'express';

//this middelware check if the route does not exists
export const error404 = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error('error la ruta no existe dentro de la api');

    res.status(404).json({
        errors:[
            {
            code:"error_ruta_inexistente",
            details:error.message,
            hhref:"https://infomexico/#errores.fly.dev"
            }
        ]
    });
    next()
}