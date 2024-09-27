"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenu from './SideMenu';
import { Menu } from 'lucide-react';

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL;

    if (!token) {
      router.push('/');
    } else {
      fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        router.push('/');
      });
    }
  }, [router]);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex">
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} user={user} />
      
      <div className="flex-1">
        <header className="p-4 flex justify-between items-center">
          <button 
            className="text-gray-600 cursor-pointer" 
            onClick={toggleSideMenu}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-green-600">Verde como siempre</h1>
        </header>

        <main className="p-8">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Bienvenido, {user?.name || 'Usuario'}</h2>
          <p className="text-xl text-gray-600 mb-8">El tiempo pasado entre árboles nunca es tiempo perdido.</p>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Tus Invernaderos</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                Añadir Nuevo
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Tus Invernaderos2</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                Añadir Nuevo
              </button>
            </div>

            {/* Placeholder for greenhouse data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Invernadero {index + 1}</h4>
                  <p className="text-gray-600">Estado: Activo</p>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-8 bg-green-100 text-green-700 px-6 py-3 rounded-full hover:bg-green-200 transition duration-300">
            Ver historial y estadísticas →
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
