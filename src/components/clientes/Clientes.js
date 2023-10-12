import React, { useEffect, useState, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { CRMContext } from '../../context/CRMContext'

const Clientes = () => {  
    
    // Trabajar con el state
    const [clientes, guardarClientes] = useState([])

    const [auth, guardarAuth] = useContext(CRMContext)

    const navigate = useNavigate()

    useEffect(() => {
      if (auth.token !== "") {
        // Query a la API
        const consultarAPI = async () => {
          try {
            const clientesConsulta = await clienteAxios.get("/clientes", {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
            setTimeout(() => {
              guardarClientes(clientesConsulta.data);
            }, 1000);
          } catch (error) {
            if ((error.response.status = 500)) {
              navigate("/iniciar-sesion");
            }
          }
        };
        consultarAPI();
      } else {
        navigate("/iniciar-sesion");
      }
    }, [clientes]);

    // si el state esta como false
    if (!auth.auth) {
        navigate("/iniciar-sesion");
    }

    if (!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clientes</h2>
            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}                        
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes 