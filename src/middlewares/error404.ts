import express, {Request, Response, NextFunction} from 'express';

export const error404 = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error('la ruta no existe');

    res.status(404).json({
        "error": error.message
    });
    next()
}