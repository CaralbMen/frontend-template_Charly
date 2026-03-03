import {api} from '../services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail} from 'lucide-react';
const Login= ()=>{
    const navigate = useNavigate();
    
    const entrar=async()=>{
        const email = document.getElementById('user').value;
        const password = document.getElementById('pwd').value;
        console.log('aqui');
        if(!email){
            console.log('Introduce el email');
        }
        if(!password){
            console.log('Introduce la contrasenia');
        }
        console.log(email, password);
        try {
            const datoss= await api.post('auth/login', {email: email, password: password});
            console.log('Respuesta del servidor:', datoss);
            
            if(datoss.codigo===200){
                localStorage.setItem('token', datoss.token);
                console.log('Login exitoso, redirigiendo...');
                navigate('/dashboard');
            } else {
                console.log('Error: No se recibió token del servidor');
                console.log('Estructura de respuesta:', datoss);
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
        }
    }
    return(
        <div className='container'>
            <div className='cardLogin'>
                <h1>Login</h1>
                <br /><br />
                <label>User: </label>
                
                <input type="text" placeholder='Usuario' id='user'/>
                <br />
                <label>Password</label>
                <input type="password" placeholder='Password' id='pwd' />
                <br /><br />
                <button onClick={entrar} id='entrar'>Entrar</button>
            </div>
        </div>
       
    )
}
export default Login;