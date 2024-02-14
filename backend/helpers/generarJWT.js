import jtw from 'jsonwebtoken';

const generarJWT = (id) => {

    return jtw.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",

    })
}

export default generarJWT;