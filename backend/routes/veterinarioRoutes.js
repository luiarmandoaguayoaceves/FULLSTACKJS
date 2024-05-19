import express from "express";
import { 
    perfil, 
    registrar, 
    confirmar, 
    autenticar, 
    comprobarToken, 
    nuevoPassword, 
    olvidePassword,
    actualizarPerfil
} from "../controllers/veterinarioController.js";
import checkAuth from '../middleware/authMiddleware.js'


const router = express.Router();
//Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)


//Area privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);

export default router;
