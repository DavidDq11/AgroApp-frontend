"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenu from './SideMenu';
import { BarChart2, Menu } from 'lucide-react';
import GreenhouseCard from './ui/greenHouseCard';
import NuevoCultivo from './ui/nuevoCultivo';
import { ESTADISTICAS_CULTIVOS } from '../utils/routes';

// Interfaz para el usuario
interface User {
  name: string;
  email: string;
}

// Interfaz para los cultivos
interface CultivoData {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;
  diasRestantes: number;
  temperatura: number;
  humedad: number;
  luminosidad: number;
  invernadero: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cultivos, setCultivos] = useState<CultivoData[]>([]); // Lista de cultivos
  const [selectedCultivo, setSelectedCultivo] = useState<CultivoData | null>(null); // Cultivo seleccionado
  const [notas, setNotas] = useState(""); // Notas del cultivo
  const router = useRouter();

  const useMock = true; // Cambia a 'false' si deseas usar el backend real

  const handleVerEstadisticas = () => {
    router.push(ESTADISTICAS_CULTIVOS); // Navega a la ruta de estadísticas
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
    } else {
      if (useMock) {
        // Simulación de los datos del usuario y cultivos
        setTimeout(() => {
          const mockUser = { name: 'Juan Pérez', email: 'juan.perez@example.com' };
          const mockCultivos: CultivoData[] = [
            {
              id: 1,
              nombre: 'Lechuga',
              tipo: 'Hidroponía NFT',
              estado: 'En crecimiento',
              diasRestantes: 15,
              temperatura: 24,
              humedad: 65,
              luminosidad: 80,
              invernadero: 'Invernadero A'
            },
            {
              id: 2,
              nombre: 'Tomate',
              tipo: 'Raíz flotante',
              estado: 'Germinación',
              diasRestantes: 30,
              temperatura: 22,
              humedad: 70,
              luminosidad: 75,
              invernadero: 'Invernadero B'
            },
          ];
          setUser(mockUser);
          setCultivos(mockCultivos);
          setLoading(false);
        }, 1000);
      } else {
        const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL;
        fetch(`${API_URL}/auth/profile`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
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
    }
  }, [router, useMock]);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleCultivoSelect = (cultivo: CultivoData) => {
    setSelectedCultivo(cultivo); // Establece el cultivo seleccionado
  };

  const handleBackToList = () => {
    setSelectedCultivo(null); // Vuelve a la lista de cultivos
  };

  const handleNotaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotas(e.target.value); // Actualiza las notas
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex">
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} user={user} />

      <div className="flex-1">
        <header className="p-4 flex justify-between items-center">
          <button className="text-gray-600 cursor-pointer" onClick={toggleSideMenu}>
            <Menu size={24} />
          </button>
          <h1 className="text-4xl font-extrabold text-green-700">
            Verde como siempre
          </h1>
        </header>

        <main className="p-8">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Bienvenido, {user?.name || 'Usuario'}</h2>
          <p className="italic text-lg text-gray-500">
            Tu esfuerzo está floreciendo, revisemos el progreso de tus cultivos.
          </p>

          {/* Si hay un cultivo seleccionado, mostrar detalles */}
          {selectedCultivo && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold text-green-800">{selectedCultivo.nombre}</h3>
                <button
                  className="text-gray-500 hover:text-red-500 transition"
                  onClick={handleBackToList}>
                  <span className="text-xl">← Volver</span>
                </button>
              </div>

              {/* Cultivo Overview */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">Tipo:</p>
                    <p>{selectedCultivo.tipo}</p>
                  </div>
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">Estado:</p>
                    <p>{selectedCultivo.estado}</p>
                  </div>
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">Días Restantes:</p>
                    <p>{selectedCultivo.diasRestantes}</p>
                  </div>
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">Invernadero:</p>
                    <p>{selectedCultivo.invernadero}</p>
                  </div>
                </div>
              </div>

              {/* Environmental Conditions */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                {[
                  { label: 'Temperatura', value: `${selectedCultivo.temperatura}°C`, ideal: '22-26°C' },
                  { label: 'Humedad', value: `${selectedCultivo.humedad}%`, ideal: '60-75%' },
                  { label: 'Luminosidad', value: `${selectedCultivo.luminosidad}%`, ideal: '70-85%' },
                ].map((item, index) => (
                  <div key={index} className="bg-green-100 text-green-800 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">{item.label}</p>
                    <p className="text-2xl">{item.value}</p>
                    <p className="text-sm text-gray-600">Ideal: {item.ideal}</p>
                  </div>
                ))}
              </div>

              {/* Cultivation Timeline */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-green-700 mb-2">Cronología del Cultivo</h4>
                <p><strong>Fecha de Siembra:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Fecha Estimada de Cosecha:</strong> {new Date(Date.now() + selectedCultivo.diasRestantes * 86400000).toLocaleDateString()}</p>
              </div>

              {/* Notes Section */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Notas del Cultivo</h3>
                <textarea
                  className="w-full p-3 border border-green-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  placeholder="Agregar notas sobre el cultivo..."
                  value={notas}
                  onChange={handleNotaChange}
                  rows={3}
                />
              </div>
            </div>
          )}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Tus Cultivos</h3>
              <button onClick={abrirModal} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                Añadir Nuevo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cultivos.map((cultivo) => (
                <GreenhouseCard
                  key={cultivo.id}
                  id={cultivo.id}
                  cultivoData={cultivo}
                  onClick={() => handleCultivoSelect(cultivo)} // Maneja la selección del cultivo
                />
              ))}
            </div>
          </div>


          <button
            className="mt-8 bg-green-100 text-green-700 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-200 transition duration-300"
            onClick={handleVerEstadisticas} // Agrega el manejador de eventos aquí
          >
            <BarChart2 size={20} />
            Ver historial y estadísticas →
          </button>
        </main>
      </div>

      {isModalOpen && <NuevoCultivo closeModal={cerrarModal} />}
    </div>
  );
};

export default Dashboard;
