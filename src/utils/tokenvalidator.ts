import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const TokenValidations = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('token-auth');
    console.log(token);
    if (!token) return res.status(401).json('Acceso denegado');

    jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    
    next();    
}