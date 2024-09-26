'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenu from './SideMenu'; // Asegúrate de que tienes el menú lateral si lo usas

// Definir la interfaz para los datos del usuario
interface User {
  name: string;
  email: string;
  // Puedes agregar más propiedades si es necesario
}

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null); // Tipo User o null
    const [loading, setLoading] = useState(true);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // Estado para controlar la apertura del menú
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || 'http://localhost:3001';

        if (!token) {
            router.push('/iniciar-sesion'); // Redirigir si no hay token
        } else {
            // Aquí puedes hacer una solicitud para obtener los datos del usuario
            fetch(`${API_URL}/auth/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setUser(data); // Guardar los datos del usuario
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                localStorage.removeItem('token'); // Eliminar token si hay un error
                router.push('/iniciar-sesion'); // Redirigir si hay error
            });
        }
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtiene el perfil
    }

    // Función para alternar la apertura/cierre del menú
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Pasa las propiedades isOpen y onClose al SideMenu */}
            <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
            
            <header className="p-4">
                {/* Botón para abrir el menú */}
                <button 
                    className="text-gray-600 cursor-pointer" 
                    onClick={toggleSideMenu}
                >
                    {isSideMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
                </button>
                
                <h1 className="text-4xl font-bold text-green-600 mb-2">Bienvenido, {user?.name || 'Usuario'}</h1>
                <p className="text-lg text-gray-600">Tiempo pasado entre árboles nunca es tiempo desperdiciado.</p>
            </header>
            <main className="p-4">
                <div className="w-full h-full bg-green-50 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800">Tus invernaderos</h2>
                    {/* Aquí puedes mostrar más información del usuario */}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
