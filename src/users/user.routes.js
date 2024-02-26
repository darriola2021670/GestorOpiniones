import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosGet,
    usuarioPost,
    usuariosPut,
} from "./user.controller.js";
import{
    existenteEmial,
    existenteUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", usuariosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6").isLength({
            min:6
        }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmial),
        validarCampos
    ],
    usuarioPost
);cd

router.put(
    "/:id",
    [
        check("id",  "No es un ID valido").isMongoId(),
        check("id").custom(existenteUsuarioById),
        validarCampos,
    ],
    usuariosPut
);

export default router;