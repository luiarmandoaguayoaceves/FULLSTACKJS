import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

const registrar = async (req, res) => {
    const {email, nombre} = req.body;

    //Revisar su existe un usuario duplicado

    const existeUsuario = await Veterinario.findOne({email})
    console.log(existeUsuario);

    if (existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }
    
    try {
        //Guardar un nuevo Veterianario 

        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //enviar email
        emailRegistro(
            {
                email, 
                nombre,
                token: veterinarioGuardado.token
            }
            );

        res.json(veterinarioGuardado);  
    } catch (error) {
        console.log(error);

    }
     
};

const perfil = (req, res) => {
    const {veterinario} = req
    res.json({veterinario});
}

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token})
    console.log(usuarioConfirmar);
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error);
    }
    
}

const autenticar = async (req, res) => {
    const {email, password} = req.body
    //Compronar si el usuario existe
    const usuario = await Veterinario.findOne({email})

    if(!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si el usuario esta confirmado 
    if (!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }

    //Revisar el password
    if( await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        })
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
    }

};

const olvidePassword = async(req, res) => {
    const {email} = req.body
    const existeVeterinario = await Veterinario.findOne({email})
    if(!existeVeterinario){
        const error = new Error('No existe');
        return res.status(400).json({msg: error.message})
    }

    //Enviar Email con instrucciones
    emailOlvidePassword({
        email,
        nombre: existeVeterinario.nombre,
        token: existeVeterinario.token
    })
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: 'Hemos enviado un email con las instrucciones'});
    } catch (error) {
        console.log(error);
    }
    
};

const comprobarToken = async (req, res) => {
    const {token} = req.params
    const tokenValido = await Veterinario.findOne({token})
    if(tokenValido){
        //El token es valido el usuario existe
        res.json({msg: 'Token valido el usuario existe'})
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message})
    }
};

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'Password modificado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    
    if(!veterinario){
        const error = new Error("Hubo un error");
        return res.status(400).json({msg: error.message})
    }

    const {email} = req.body;
    if(veterinario.email !== email){
        const existeEmail = await Veterinario.findOne({email})
        if(existeEmail){
            const error = new Error("Eses email ya esta en uso");
            return res.status(400).json({msg: error.message})
        }
    }

    try {
        veterinario.nombre = req.body.nombre 
        veterinario.web = req.body.web 
        veterinario.telefono = req.body.telefono 
        veterinario.email = req.body.email 

        const veterinarioActualizado = await veterinario.save()
        res.json(veterinarioActualizado)
    } catch (error) {
        console.log(error);
    }
}


const actualizarPassword = async (req, res) =>{
    // Leer los datos 
    const { id } = req.veterinario;
    const { pwd_actual, pwd_nuevo } = req.body;
    // Comprobar que el veterinario existe Email
    const veterinario = await Veterinario.findById(id);
    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }
    // comprobar el password 

    if(await veterinario.comprobarPassword(pwd_actual)){
         // Almacenar la password por La nueva

         veterinario.password = pwd_nuevo;
         await veterinario.save();
         res.json({msg: 'Password Almacenado Correctamente'})
    }else{
        const error = new Error('El Password Actual es Incorrecto');
        return res.status(400).json({msg: error.message});
    }
   
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}