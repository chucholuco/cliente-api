import React, {useState, useEffect, Fragment} from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from "../../config/axios";
import Spinner from '../layout/Spinner'

const EditarProducto = () => {    

    const { id } = useParams()

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    const [archivo, guardarArchivo] = useState('')

    useEffect(() => {
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`productos/${id}`)
            guardarProducto(productoConsulta.data)
        }

        consultarAPI()
    }, [])

    const navigate = useNavigate()

    const editarProducto = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
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

    const {nombre, precio, imagen} = producto

    if (!nombre) return <Spinner />

    return (
        <Fragment>
        <h2>Editar Producto</h2>

        <form
            onSubmit={editarProducto}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"   
                    onChange={leerInformacionProducto}  
                    defaultValue={nombre}                
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
                    defaultValue={precio}                
                />
            </div>

            <div className="campo">
                <label>Imagen:</label>
                { 
                    imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt='imagen' width="300"/>
                    ) :  null
                }
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
                        value="Editar Producto"                             
                    />
            </div>
        </form>
    </Fragment>
    )
}

export default EditarProducto 