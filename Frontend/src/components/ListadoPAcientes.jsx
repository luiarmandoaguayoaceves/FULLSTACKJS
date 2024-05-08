import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


function ListadoPAcientes() {
  const {pacientes} = usePacientes()

  return (
    <>
    {pacientes.length ? (
      <>
      <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">Administra tus {''}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>

      {pacientes.map( paciente => (
        <Paciente
          key={paciente._id}
          paciente={paciente}
          />
      ))}
      </>
    ) : (
      <>
        <h2 className="font-black text-center text-3xl">No Hay Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes {''}
          <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
        </p>
      </>
    )}
    </>
  )
}

export default ListadoPAcientes