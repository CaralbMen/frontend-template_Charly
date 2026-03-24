import {api} from '../services/api';
import { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
        const latitud= document.getElementById('latitud').value;
        const longitud= document.getElementById('longitud').value;

        const resultado= await api.post('productos/crear', {nombre:nombre, precio: precio, stock: stock, descripcion: descripcion, imagen: imagen, categoria: categoria, youtube_id: youtube_id, latitud: latitud, longitud: longitud});
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

                    <br /><label>Latitud</label>
                    <input type="number" placeholder='Latitud' id='latitud'/>
                    <br /><label>Longitud</label>
                    <input type="number" placeholder='Longitud' id='longitud'/>
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

                                   
                                
                                <div className='h-48 w-full border-t border-slate-100 z-0 relative'>
                                    <MapContainer 
                                        center={[producto.latitud|| 20.5441704, producto.longitud|| -100.2757814]} 
                                        zoom={13} scrollWheelZoom={false} 
                                        style={{height: '100%', width: '100%', zIndex:0 }}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; OpenStreetMap'
                                        />
                                        <Marker position={[producto.latitud|| 20.5441704, producto.longitud|| -100.2757814]}>
                                            <Popup>
                                                Ubicacion de:<br/><strong>{producto.nombre}</strong>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
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