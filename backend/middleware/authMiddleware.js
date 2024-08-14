import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decode.id).select(
                "-password -token -confirmado"
            );
            return next();  // Termina el flujo aquí si todo está bien
        } catch (error) {
            const e = new Error('Token no válido');
            return res.status(403).json({ msg: e.message });  // Asegúrate de usar return para terminar el flujo
        }
    }

    if (!token) {
        const error = new Error('Token no válido o inexistente');
        return res.status(403).json({ msg: error.message });  // Termina el flujo aquí
    }

    next();
};

export default checkAuth;
