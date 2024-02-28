import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuarioPost = async (req, res) =>{
    const {nombre, correo, password} = req.body;
    const usuario = User({nombre, correo, password});
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await User.findOne({_id: id});
    
    res.status(200).json({
        usuario
    })
}

export const usuariosPut = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, password, nombre, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const usuario = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Datos Actualizados :)',
        usuario
    });
}

