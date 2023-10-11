import React, {useState, Fragment} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../../config/axios";


const NuevoProducto = () => {   
    
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    const [archivo, guardarArchivo] = useState('')

    const navigate = useNavigate()

    const agregarProducto = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            
            navigate('/productos')

        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"   
                        onChange={leerInformacionProducto}                  
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={leerInformacionProducto}                  
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="imagen" 
                        onChange={leerArchivo}                  
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Producto"                             
                        />
                </div>
            </form>
        </Fragment>
        
    )
}

export default NuevoProducto 