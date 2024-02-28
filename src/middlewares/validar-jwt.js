import Jwt  from "jsonwebtoken";
import Usuario from '../users/user.model.js';

export const validarJWT =  async (req, res, next) => {
    const token = req.header("x-token");

    if(!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion",
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(401).json({
                msg: "El usuario no existe"
            });
        }
        if(!usuario.estado) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado false"
            });
        }
        req.usuario = usuario;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token invalido",
        });
    }
}