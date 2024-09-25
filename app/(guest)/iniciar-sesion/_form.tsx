'use client'

import { useForm } from '../../../hooks/useForm'
import { getErrorsForFields, transformErrors } from '../../../lib/actions'
import { Login } from '../../../types/MyTypes'
import { useRouter } from 'next/navigation'
import { MUNDOS_ROUTE, PANTALLA_INICIO } from '../../../utils/routes'
import { HOME_ROUTE } from '../../../utils/routes'
import { REGISTER_ROUTE } from '../../../utils/routes'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
import { toast } from '../../../components/ui/use-toast'
import Link from 'next/link';


export default function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState<string | null>(null)
    
    const router = useRouter()

    // Usuario y contraseña quemados
    const hardcodedUser = {
        email: 'prueba@gmail.com',
        password: '123456'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            toast({
                title: 'Login exitoso',
                description: 'Has ingresado correctamente',
            });
            router.push(PANTALLA_INICIO);
        } else {
            console.error('Login error response:', data);
            setError(data.message || 'Correo o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        setError('Hubo un problema al iniciar sesión, intenta nuevamente');
    }
};

    return (
        <>
        <Link 
                href={HOME_ROUTE}
                className="
                    absolute top-4 left-4
                    bg-gray-700 hover:bg-gray-600
                    text-white
                    font-bold
                    py-2 px-4
                    rounded
                    transition duration-300
                    shadow-md hover:shadow-lg
                    z-10
                "
            >
                Inicio
            </Link>
        <form className="flex flex-col gap-y-6 w-9/12 sm:w-5/12" onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {error && <small className="text-red-500">{error}</small>}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" 
                />
            </div>            
            <button
                type="submit"
                className="
                bg-green-700  /* Fondo verde oscuro */
                text-white  /* Texto blanco */
                py-2 px-6  /* Padding interno en eje Y y X */
                rounded-lg  /* Bordes redondeados */
                shadow-lg  /* Sombra grande */
                hover:bg-green-600  /* Fondo verde más claro al pasar el cursor */
                hover:shadow-xl  /* Sombra más intensa al pasar el cursor */
                transition  /* Suaviza las transiciones */
                duration-300  /* Duración de la transición */
                transform  /* Habilita transformaciones */
                hover:-translate-y-1  /* Eleva ligeramente el botón al hacer hover */
                active:translate-y-0.5  /* Baja el botón ligeramente cuando se presiona */
                font-semibold  /* Hace el texto un poco más grueso */
                cursor-pointer  /* Cambia el cursor a mano */
                tracking-wider  /* Espacia un poco más las letras */
                "
            >
            Ingresar
            </button>
            
            <Link
                type="submit"
                href={REGISTER_ROUTE}
                className="
                bg-green-700  /* Fondo verde oscuro */
                text-white  /* Texto blanco */
                py-2 px-6  /* Padding interno en eje Y y X */
                rounded-lg  /* Bordes redondeados */
                shadow-lg  /* Sombra grande */
                hover:bg-green-600  /* Fondo verde más claro al pasar el cursor */
                hover:shadow-xl  /* Sombra más intensa al pasar el cursor */
                transition  /* Suaviza las transiciones */
                duration-300  /* Duración de la transición */
                transform  /* Habilita transformaciones */
                hover:-translate-y-1  /* Eleva ligeramente el botón al hacer hover */
                active:translate-y-0.5  /* Baja el botón ligeramente cuando se presiona */
                font-semibold  /* Hace el texto un poco más grueso */
                cursor-pointer  /* Cambia el cursor a mano */
                tracking-wider  /* Espacia un poco más las letras */
                flex items-center justify-center  /* Añade estas clases */
                text-center  /* Añade esta clase */
                w-full  /* Añade esta clase para que ocupe todo el ancho disponible */
                "
            >
                Registrarse
            </Link>
        </form>
        </>
    )
}
