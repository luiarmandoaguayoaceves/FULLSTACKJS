import express from "express";
import {agregarPacientes, obtenerPacientes} from "../controllers/pacienteControllers.js"
const router = express.Router();

router.route('/')
.post(agregarPacientes)
.get(obtenerPacientes)


export default router;