import {Request, Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';


 export const signin = async (req: Request, res: Response): Promise <Response> => {
    
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = await user.encryptPass(user.password);
    

    const username =  await User.findOne({username: req.body.username});
    if( username ) return res.status(400).json('Usuario repetido');

    const email =  await User.findOne({email: req.body.email});
    if( email ) return res.status(400).json('Correo repetido');
    
    const savedUser = await user.save();
    const token: string = jwt.sign( {_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokentest');

    return res.status(200).send({
        "user":user,
        "token": token
    });
 }

 export const login = async (req: Request, res: Response): Promise <Response> => {
    
    const user =  await User.findOne({email: req.body.email});
    if( !user ) return res.status(400).json('Correo invalido');
    
    const passValidate: boolean = await user.validatePass(req.body.password);
    if( !passValidate ) return res.status(400).json('Contraseña invalida');

    const token: string = jwt.sign( {_id: user._id}, process.env.TOKEN_SECRET || 'tokentest',{
        expiresIn: 60 * 60
    });

    return res.status(200).send({
        "user":user,
        "token": token
    })
 }

