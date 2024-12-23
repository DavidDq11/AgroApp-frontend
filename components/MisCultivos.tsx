'use client';

import React, { useState } from 'react';
import { Calendar, Droplets, Thermometer, Plus, ChevronRight, Sun } from 'lucide-react';
import SideMenu from './SideMenu'; // Asegúrate de importar el SideMenu
import { Menu } from 'lucide-react';  // Asegúrate de importar el ícono Menu


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
}

const CultivoCard: React.FC<CultivoCardProps> = ({ cultivo }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-green-100 overflow-hidden group">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-1 group-hover:text-green-600 transition-colors">
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
        <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center">
          <Thermometer className="w-5 h-5 text-orange-500 mb-1" />
          <span className="text-sm font-medium text-orange-700">{cultivo.temperatura}°C</span>
          <span className="text-xs text-orange-500">Temperatura</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center justify-center">
          <Droplets className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-sm font-medium text-blue-700">{cultivo.humedad}%</span>
          <span className="text-xs text-blue-500">Humedad</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 flex flex-col items-center justify-center">
          <Sun className="w-5 h-5 text-yellow-500 mb-1" />
          <span className="text-sm font-medium text-yellow-700">{cultivo.luminosidad}%</span>
          <span className="text-xs text-yellow-500">Luz</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-green-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-500" />
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

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

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
          <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Nuevo Cultivo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultivos.map((cultivo) => (
            <CultivoCard key={cultivo.id} cultivo={cultivo} />
          ))}
          
          <div className="border-2 border-dashed border-green-200 hover:border-green-400 transition-all duration-300 rounded-xl flex items-center justify-center p-8 cursor-pointer bg-white/50 hover:bg-white/80 group">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Plus className="w-8 h-8 text-green-500 group-hover:text-green-600" />
              </div>
              <p className="text-green-700 font-medium">Añadir nuevo cultivo</p>
              <p className="text-sm text-gray-500 mt-1">Configura un nuevo cultivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisCultivos;
