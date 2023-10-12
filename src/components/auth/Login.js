import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

import { CRMContext } from "../../context/CRMContext";

function Login() {

  const [auth, guardarAuth] = useContext(CRMContext)

  const [credenciales, guardarCredenciales] = useState({});

  const navigate = useNavigate()

  const iniciarSesion = async e => {
    e.preventDefault();
    try {
        const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales)
        const {token} = respuesta.data
        localStorage.setItem('token', token)

        // colocarlo en el estate
        guardarAuth({
          token, 
          auth: true
        })

        Swal.fire(
            'Login Correcto',
            "Has iniciado Sesion",
            "success"
        )
        navigate('/')
    } catch (error) {
        console.log(error)
        Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: error.response.data.mensaje
        })
    }
  };

  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h2>Iniciar Sesion</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email para Iniciar Sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para Iniciar Sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
