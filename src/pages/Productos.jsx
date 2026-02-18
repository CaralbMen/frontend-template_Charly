import { useState, useEffect } from 'react';
import { api } from '../services/api';


const Productos = () => {
    const [productos, setProductos]= useState([]);

    const lista_api = async()=>{
        try{
            const lista = await api.get('/productos/');
            setProductos(lista.data);
            console.log(productos);
        }catch(error){
            console.error('Error al obtener productos:', error);
        }
    }
    useEffect(()=>{
        lista_api();
    },[]);
    return(
        <div>
            <h1 className="text-3xl font-bold text-slate-800">Productos</h1>
            <p className="mt-4 text-slate-600">Bienvenido al sistema. Selecciona una opción del menú.</p>
            {productos.map((producto) => (
            <div key={producto.id} className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold text-slate-800">{producto.nombre}</h2>
                <p className="text-slate-600">{producto.descripcion}</p>
                <p className="text-slate-800 font-bold">${producto.precio}</p>
            </div>
            ))}
        </div>
    );
  
};

export default Productos;