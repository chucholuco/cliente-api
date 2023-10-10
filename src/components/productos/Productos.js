import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";

const Productos = () => {

    const [productos, guardarProductos] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos')    
            setTimeout(() => {
                guardarProductos(productosConsulta.data)   
              }, 1000);                
        }
        consultarAPI()
    }, [productos])

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