'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, Droplets, Thermometer, Plus, ChevronRight, Sun, X } from 'lucide-react';
import SideMenu from './SideMenu';
import { Menu } from 'lucide-react';
import NuevoCultivo from './ui/nuevoCultivo';
import { Line } from 'react-chartjs-2'; // Importar para gráficos
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Cultivo {
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

interface CultivoCardProps {
  cultivo: Cultivo;
  onSelect: (cultivo: Cultivo) => void;
}

const CultivoCard: React.FC<CultivoCardProps> = ({ cultivo, onSelect }) => (
  <div
    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-green-100 overflow-hidden group transform hover:scale-105"
    onClick={() => onSelect(cultivo)}
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-green-700 mb-1 group-hover:text-green-600 transition-colors">
            {cultivo.nombre}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            {cultivo.invernadero}
          </p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
          {cultivo.estado}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center shadow-md">
          <Thermometer className="w-6 h-6 text-orange-500 mb-1" />
          <span className="text-sm font-medium text-orange-700">{cultivo.temperatura}°C</span>
          <span className="text-xs text-orange-500">Temperatura</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center justify-center shadow-md">
          <Droplets className="w-6 h-6 text-blue-500 mb-1" />
          <span className="text-sm font-medium text-blue-700">{cultivo.humedad}%</span>
          <span className="text-xs text-blue-500">Humedad</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 flex flex-col items-center justify-center shadow-md">
          <Sun className="w-6 h-6 text-yellow-500 mb-1" />
          <span className="text-sm font-medium text-yellow-700">{cultivo.luminosidad}%</span>
          <span className="text-xs text-yellow-500">Luz</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-green-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          <span className="text-sm text-green-700 font-medium">{cultivo.diasRestantes} días restantes</span>
        </div>
        <ChevronRight className="w-5 h-5 text-green-400 group-hover:text-green-500 transition-colors" />
      </div>
    </div>
  </div>
);

const MisCultivos: React.FC = () => {
  const [selectedCultivo, setSelectedCultivo] = useState<Cultivo | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notas, setNotas] = useState<string>('');

  const toggleSideMenu = useCallback(() => setIsSideMenuOpen(!isSideMenuOpen), [isSideMenuOpen]);
  const abrirModal = useCallback(() => setIsModalOpen(true), []);
  const cerrarModal = useCallback(() => setIsModalOpen(false), []);
  const cerrarDetalle = useCallback(() => setSelectedCultivo(null), []);

  const cultivos: Cultivo[] = [
    {
      id: 1,
      nombre: 'Tomates Cherry',
      tipo: 'Fruto',
      estado: 'En crecimiento',
      diasRestantes: 45,
      temperatura: 24,
      humedad: 65,
      luminosidad: 80,
      invernadero: 'Invernadero 1'
    },
    {
      id: 2,
      nombre: 'Lechuga Romana',
      tipo: 'Hoja',
      estado: 'Germinación',
      diasRestantes: 30,
      temperatura: 22,
      humedad: 70,
      luminosidad: 75,
      invernadero: 'Invernadero 2'
    }
  ];

  const chartData = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
    datasets: [
      {
        label: 'Temperatura',
        data: [22, 23, 24, 23, 22],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Humedad',
        data: [60, 62, 65, 68, 70],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'Luminosidad',
        data: [75, 80, 82, 85, 90],
        borderColor: 'rgba(255, 205, 86, 1)',
        fill: false,
      },
    ],
  };

  const handleNotaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotas(event.target.value);
    // Aquí podrías hacer una llamada para guardar las notas (por ejemplo, en una base de datos)
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8 flex">
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} user={null} />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <button onClick={toggleSideMenu} className="text-gray-600 cursor-pointer">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Mis Cultivos</h1>
            <p className="text-gray-600">Gestiona y monitorea tus cultivos activos</p>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={abrirModal}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Nuevo Cultivo</span>
          </button>
        </div>

        {selectedCultivo ? (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-700">{selectedCultivo.nombre}</h2>
              <button onClick={cerrarDetalle} className="text-gray-500 hover:text-red-500 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Tipo:</strong> {selectedCultivo.tipo}</p>
              <p><strong>Estado:</strong> {selectedCultivo.estado}</p>
              <p><strong>Temperatura:</strong> {selectedCultivo.temperatura}°C</p>
              <p><strong>Humedad:</strong> {selectedCultivo.humedad}%</p>
              <p><strong>Luminosidad:</strong> {selectedCultivo.luminosidad}%</p>
              <p><strong>Invernadero:</strong> {selectedCultivo.invernadero}</p>
              <p><strong>Fecha de Siembra:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Fecha Estimada de Cosecha:</strong> {new Date(Date.now() + selectedCultivo.diasRestantes * 86400000).toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700">Condiciones Ideales</h3>
              <ul>
                <li><strong>Temperatura Ideal:</strong> 22-26°C</li>
                <li><strong>Humedad Ideal:</strong> 60-75%</li>
                <li><strong>Luminosidad Ideal:</strong> 70-85%</li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700">Notas del Cultivo</h3>
              <textarea
                className="w-full p-3 border border-green-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Agregar notas sobre el cultivo..."
                value={notas}
                onChange={handleNotaChange}
                onBlur={handleNotaChange}
              />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-700">Evolución del Cultivo</h3>
              <Line data={chartData} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultivos.map((cultivo) => (
              <CultivoCard key={cultivo.id} cultivo={cultivo} onSelect={setSelectedCultivo} />
            ))}
          </div>
        )}

        {isModalOpen && <NuevoCultivo closeModal={cerrarModal} />}
      </div>
    </div>
  );
};

export default MisCultivos;