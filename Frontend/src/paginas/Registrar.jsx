import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      return setAlerta({msg: 'Algún campo esta vació', error: true})
    }

    if(password !== repetirPassword){
      return setAlerta({msg: 'Los password son diferentes', error: true})
    }
    if(password.length < 6 ){
      return setAlerta({msg: 'El password es muy corto, agregar mínimo 6 caracteres', error: true})
    }
    setAlerta({})

    //Crear Usuario en la API
    try {
      const url = "http://localhost:4000/api/veterinarios"
      const respuesta = axios.post(url, {nombre, email, password})
      console.log(respuesta);
      // await clienteAxios.post(`/veterinarios`, {nombre, email, password})
      // setAlerta(
      //   {
      //   msg: 'Creado Correctamente, Revisa tu Email', 
      //   error: false
      // }
      // )
    } catch (error) {
      setAlerta(
        {
        msg:error.response.data.msg, 
        error: true
      }
        );
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta={alerta}
        />}
        
        <form action="" 
        onSubmit={handleSubmit}>
        <div className="my-5">
            <label
            className="uppercase text-gray-600 block text-xl font-bold"
            >
                Nombre
            </label>
            <input 
            type="text" 
            placeholder="Tu Nombre"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
            className="uppercase text-gray-600 block text-xl font-bold"
            >
                Email
            </label>
            <input 
            type="text" 
            placeholder="Email de Registros"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
            className="uppercase text-gray-600 block text-xl font-bold"
            >
                Password
            </label>
            <input 
            type="password" 
            placeholder="Tu Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
            className="uppercase text-gray-600 block text-xl font-bold"
            >
                Repetir Password
            </label>
            <input 
            type="password" 
            placeholder="Repoite tu Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input 
          type="submit"
          value="Craear Cuenta" 
          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
            <Link
            className=" block text-center my-5 text-gray-500"
            to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
            <Link 
            className=" block text-center my-5 text-gray-500"
            to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
