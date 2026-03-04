import {api} from '../services/api';
import { useState, useEffect } from 'react';

const Productos= ()=>{
    const [listaProductos, setListaProductos]= useState([]);
    const [carganding, setCarganding]= useState(true);

    // const [nombre, setNombre]= useState('');
    // const [precio, setPrecio]= useState('');
    // const [descripcion, setDescripcion]= useState('');
    // const [imagen, setImagen]= useState('');
    // const [categoria, setCategoria]= useState('');

    const guardarProducto= async()=>{
        const nombre= document.getElementById('nombre').value;
        const precio= document.getElementById('precio').value;
        const descripcion= document.getElementById('descripcion').value;
        const imagen= document.getElementById('imagen').value;
        const categoria= document.getElementById('categoria').value;
        const resultado= await api.post('productos/crear', {nombre, precio, descripcion, imagen, categoria});
        console.log(resultado);
    }

    useEffect(()=>{
        const obtener=async()=>{
            console.log('Por obtener productos..');
            try{
                const datos= await api.get('productos');
                setListaProductos(datos);
                setCarganding(false);
                console.log("Datos Cargados");
                // console.log(listaProductos.datos);
            }catch(e){
                console.log(`Error: ${e}`);
            }
        }
        obtener();
    },[])

    return(
        <div>
            {carganding?(
                <h1>Cargando...</h1>
            ):(
                <>
                    <div className="crear">
                        <div className="formulario">
                            <label> Nombre</label>
                            <input type="text" placeholder='Nombre del producto' id='nombre'/>
                            <br /><label>Precio</label>
                            <input type="number" placeholder='Precio' id='precio' />

                            <br /><label>Descripcion</label>
                            <input type="text" placeholder='Descripcion' id='descripcion'/>

                            <br /><label>url de imagen</label>
                            <input type="text" placeholder='Url web' id='imagen' />

                            <br /><label>id_categoria</label>
                            <input type="number" placeholder='Categoria' id='categoria'/>

                            <br /><br />
                            <button onClick={guardarProducto}>Guardar</button>
                        </div>
                    </div>
                    <h1>Productos</h1>
                    <div className='productos'>
                        {listaProductos.map((producto)=>(
                            <div className='card'>
                                <center>
                                    <h2>{producto.nombre}</h2>
                                    <img src={producto.imagen_url} alt={producto.descripcion} />
                                    {/* <p>{producto.descripcion}</p> */}
                                    <p>Precio: {producto.precio}</p>
                                </center>
                            </div>
                            
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Productos;