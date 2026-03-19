import {api} from '../services/api';
import { useState, useEffect } from 'react';

const Productos= ()=>{
    const [listaProductos, setListaProductos]= useState([]);
    const [carganding, setCarganding]= useState(true);
    const [textButton, setTextButton]= useState('Crear Producto');
    const guardarProducto= async()=>{
        const nombre= document.getElementById('nombre').value;
        const precio= document.getElementById('precio').value;
        const stock= document.getElementById('stock').value;
        const descripcion= document.getElementById('descripcion').value;
        const imagen= document.getElementById('imagen').value;
        const categoria= document.getElementById('categoria').value;
        const youtube_id= document.getElementById('id_youtube').value;

        const resultado= await api.post('productos/crear', {nombre:nombre, precio: precio, stock: stock, descripcion: descripcion, imagen: imagen, categoria: categoria, youtube_id: youtube_id});
        console.log(resultado);
        alert(resultado.mensaje);
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
            <div className="crear">
                <button className="nuevo-btn" onClick={() =>{
                    document.querySelector('.formulario').classList.toggle('hidden')
                    setTextButton(textButton === 'Crear Producto' ? 'Cancelar' : 'Crear Producto')
                    
                }}>{textButton}</button>
                <div className="formulario hidden">
                    <label> Nombre</label>
                    <input type="text" placeholder='Nombre del producto' id='nombre'/>
                    <br /><label>Precio</label>
                    <input type="number" placeholder='Precio' id='precio' />

                    <br /><label>Stock</label>
                    <input type="number" placeholder='Stock' id='stock' />

                    <br /><label>Descripcion</label>
                    <input type="text" placeholder='Descripcion' id='descripcion'/>

                    <br /><label>url de imagen</label>
                    <input type="text" placeholder='Url web' id='imagen' />

                    <br /><label>id_categoria</label>
                    <input type="number" placeholder='Categoria' id='categoria'/>

                    <br /><label>Id de Youtube</label>
                    <input type="text" placeholder='Id_Youtube' id='id_youtube' />

                    <br /><br />
                    <button className='guardar' onClick={guardarProducto}>Guardar</button>
                </div>
            </div>
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


                                    {producto.youtube_id?(
                                        <iframe width="300" height="200" src={`https://www.youtube.com/embed/${producto.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    ):(
                                        <img src={producto.imagen_url} alt={producto.descripcion} />
                                    )}
                                    
                                    
                                    <p>Precio: {producto.precio}</p>
                                    <p>Stock: {producto.stock}</p>

                                   
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