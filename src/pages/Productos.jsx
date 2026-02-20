import {api} from '../services/api';
import { useState, useEffect } from 'react';

const Productos= ()=>{
    const [listaProductos, setListaProductos]= useState([]);
    const [carganding, setCarganding]= useState(true);

    useEffect(()=>{
        const obtener=async()=>{
            console.log('Por obtener productos..');
            try{
                const datos= await api.get('productos');
                setListaProductos(datos);
                setCarganding(false);
                console.log("Datos Cargados");
                console.log(listaProductos.datos);
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