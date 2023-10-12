import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";
import { CRMContext } from '../../context/CRMContext'

const Productos = () => {

    const [productos, guardarProductos] = useState([])
    const [auth, guardarAuth] = useContext(CRMContext)

    const navigate = useNavigate()

    useEffect(() => {
      if (auth.token !== "") {
        const consultarAPI = async () => {
          try {
            const productosConsulta = await clienteAxios.get('/productos', {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });    
            setTimeout(() => {
                guardarProductos(productosConsulta.data)   
              }, 1000);                
  
          } catch (error) {
            if ((error.response.status = 500)) {
              navigate("/iniciar-sesion");
            }
          }
       }
      consultarAPI()
      } else {
        navigate("/iniciar-sesion");
      }
       
    }, [productos])

    // si el state esta como false
    if (!auth.auth) {
      navigate("/iniciar-sesion");
    }

    if (!productos.length) return <Spinner />

  return (
    <Fragment>
      <h2>Productos</h2>
      
      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente">        
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
            {productos.map(producto => (
                <Producto 
                    key={producto._id}
                    producto={producto}
                />
            ))}     
      </ul>
    </Fragment>
  );
};

export default Productos;