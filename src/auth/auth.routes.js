import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos"; 

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
);

export default router;