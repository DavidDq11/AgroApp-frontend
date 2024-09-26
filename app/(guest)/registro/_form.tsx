'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HOME_ROUTE, LOGIN_ROUTE } from '../../../utils/routes'
import Link from 'next/link'

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null) // Nuevo estado para el mensaje de éxito
    
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Submit form data:", formData); 
        // Validación básica
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL;

        try {
            // Realizar la petición al backend
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.email.split('@')[0], // Puedes usar la parte del correo como username o definir otra lógica
                    name: `${formData.firstName} ${formData.lastName}`, // Combina nombre y apellido
                    email: formData.email,
                    password: formData.password,
                }),
            });

            console.log("Response status:", response.status); // Ver si se está obteniendo una respuesta
            
            const data = await response.json(); // Mover aquí la obtención de datos
            if (!response.ok) {
                console.error('Error:', data);
                setError(data.message || 'Error desconocido en el registro'); 
                console.log('Backend response data:', data); // Ver los datos del backend
                return; // Asegúrate de salir aquí si hay un error
            }

            // Si el registro fue exitoso, establecer el mensaje de éxito
            console.log('✅ Registro exitoso');
            setSuccessMessage('Registro exitoso. Serás redirigido al inicio de sesión en breve.');
            setTimeout(() => {
                router.push(LOGIN_ROUTE);
            }, 2000); // Redirige después de 2 segundos

        } catch (error) {
            console.error('Error en el registro:', error);
            setError('Error en el servidor');
        }
    };

    return (
        <>
            <Link 
                href={HOME_ROUTE}
                className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md hover:shadow-lg z-10"
            >
                Inicio
            </Link>
            <form className="flex flex-col gap-y-4 w-9/12 sm:w-5/12" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <small className="text-red-500">{error}</small>}
                {successMessage && (
                <div className="flex items-center p-4 mt-2 text-green-700 bg-green-100 border border-green-300 rounded-lg shadow-md transition-opacity duration-500">
                    <svg className="w-6 h-6 mr-2 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1.293-11.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L11 9.414l-1.293 1.293a1 1 0 0 1-1.414-1.414l2-2z" clipRule="evenodd" />
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}
                <button
                    type="submit"
                    className="bg-green-700 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 active:translate-y-0.5 font-semibold cursor-pointer tracking-wider"
                >
                    Registrarse
                </button>
                <Link
                    href={LOGIN_ROUTE}
                    className="bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 active:translate-y-0.5 font-semibold cursor-pointer tracking-wider flex items-center justify-center text-center w-full"
                >
                    Ya tengo una cuenta
                </Link>
            </form>
        </>
    )
}
