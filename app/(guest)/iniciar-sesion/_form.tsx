'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PANTALLA_INICIO, HOME_ROUTE, REGISTER_ROUTE } from '../../../utils/routes';
import { Button } from '../../../components/ui/button';
import { toast } from '../../../components/ui/use-toast';
import Link from 'next/link';

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    // Manejo de cambio en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
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
                const errorMessage = data.message || 'Correo o contraseña incorrectos';
                console.error('Login error response:', errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setError('No se pudo conectar al servidor. Intenta nuevamente más tarde.');
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
                <Button
                    type="submit"
                    className="
                        bg-green-700
                        text-white
                        py-2 px-6
                        rounded-lg
                        shadow-lg
                        hover:bg-green-600
                        hover:shadow-xl
                        transition
                        duration-300
                        transform
                        hover:-translate-y-1
                        active:translate-y-0.5
                        font-semibold
                        cursor-pointer
                        tracking-wider
                    "
                >
                    Ingresar
                </Button>

                <Link
                    href={REGISTER_ROUTE}
                    className="
                        bg-green-700
                        text-white
                        py-2 px-6
                        rounded-lg
                        shadow-lg
                        hover:bg-green-600
                        hover:shadow-xl
                        transition
                        duration-300
                        transform
                        hover:-translate-y-1
                        active:translate-y-0.5
                        font-semibold
                        cursor-pointer
                        tracking-wider
                        flex items-center justify-center
                        text-center
                        w-full
                    "
                >
                    Registrarse
                </Link>
            </form>
        </>
    );
}
