
const registrar = (req, res) => {
    const {email, password, nombre} = req.body;
    console.log(nombre);
    console.log(email);
    console.log(password);
    res.json({msg: "Registrar usuario"});   
};

const perfil = (req, res) => {
    res.json({msg: "Mostrando perfil"});
}

export {
    registrar,
    perfil
}