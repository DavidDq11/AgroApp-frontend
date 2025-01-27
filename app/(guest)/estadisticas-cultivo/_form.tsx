'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Thermometer, Droplets, Sun, RefreshCw, Menu, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import SideMenu from '../../../components/SideMenu';

// Datos simulados para múltiples cultivos
const mockCultivosStatistics = {
  Cultivo1: {
    temperature: [
      { day: 'Lun', value: 22 },
      { day: 'Mar', value: 24 },
      { day: 'Mié', value: 23 },
      { day: 'Jue', value: 25 },
      { day: 'Vie', value: 24 },
    ],
    humidity: [
      { day: 'Lun', value: 60 },
      { day: 'Mar', value: 62 },
      { day: 'Mié', value: 58 },
      { day: 'Jue', value: 65 },
      { day: 'Vie', value: 63 },
    ],
    light: [
      { day: 'Lun', value: 200 },
      { day: 'Mar', value: 220 },
      { day: 'Mié', value: 210 },
      { day: 'Jue', value: 230 },
      { day: 'Vie', value: 215 },
    ],
  },
  Cultivo2: {
    temperature: [
      { day: 'Lun', value: 20 },
      { day: 'Mar', value: 22 },
      { day: 'Mié', value: 21 },
      { day: 'Jue', value: 23 },
      { day: 'Vie', value: 22 },
    ],
    humidity: [
      { day: 'Lun', value: 70 },
      { day: 'Mar', value: 72 },
      { day: 'Mié', value: 68 },
      { day: 'Jue', value: 75 },
      { day: 'Vie', value: 73 },
    ],
    light: [
      { day: 'Lun', value: 250 },
      { day: 'Mar', value: 270 },
      { day: 'Mié', value: 260 },
      { day: 'Jue', value: 280 },
      { day: 'Vie', value: 265 },
    ],
  },
};

const StatisticsModule: React.FC = () => {
  const [selectedCultivo, setSelectedCultivo] = useState<string>('Cultivo1');
  const [statistics, setStatistics] = useState(mockCultivosStatistics[selectedCultivo as keyof typeof mockCultivosStatistics]);
  const [loading, setLoading] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const fetchStatistics = async () => {
    setLoading(true);
    setTimeout(() => {
      // Simula la carga de datos desde un API
      setStatistics(mockCultivosStatistics[selectedCultivo as keyof typeof mockCultivosStatistics]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Actualizar estadísticas cuando cambia el cultivo seleccionado
    setStatistics(mockCultivosStatistics[selectedCultivo as keyof typeof mockCultivosStatistics]);
  }, [selectedCultivo]);

  // Función para calcular promedios
  const calculateAverage = (data: { value: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (total / data.length).toFixed(2);
  };

  // Función para encontrar máximos y mínimos
  const findMaxMin = (data: { value: number }[]) => {
    const values = data.map(item => item.value);
    return {
      max: Math.max(...values),
      min: Math.min(...values),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8 flex">
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} user={null} />

      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={toggleSideMenu} className="text-gray-600 cursor-pointer">
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-green-700">Estadísticas</h1>
          <Button
            onClick={fetchStatistics}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
          >
            <RefreshCw size={20} />
            <span>{loading ? 'Cargando...' : 'Actualizar'}</span>
          </Button>
        </div>

        {/* Selector de cultivos */}
        <div className="mb-6">
          <label htmlFor="cultivoSelect" className="block text-gray-700 font-semibold mb-2">
            Seleccionar cultivo:
          </label>
          <select
            id="cultivoSelect"
            value={selectedCultivo}
            onChange={(e) => setSelectedCultivo(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {Object.keys(mockCultivosStatistics).map((cultivo) => (
              <option key={cultivo} value={cultivo}>
                {cultivo}
              </option>
            ))}
          </select>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de Temperatura */}
          <div className="bg-orange-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="text-orange-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-orange-700">Temperatura</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={statistics.temperature}>
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <p>Promedio: {calculateAverage(statistics.temperature)}°C</p>
              <p>Máximo: {findMaxMin(statistics.temperature).max}°C</p>
              <p>Mínimo: {findMaxMin(statistics.temperature).min}°C</p>
            </div>
          </div>

          {/* Tarjeta de Humedad */}
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="text-blue-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-blue-700">Humedad</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={statistics.humidity}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <p>Promedio: {calculateAverage(statistics.humidity)}%</p>
              <p>Máximo: {findMaxMin(statistics.humidity).max}%</p>
              <p>Mínimo: {findMaxMin(statistics.humidity).min}%</p>
            </div>
          </div>

          {/* Tarjeta de Luz */}
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="text-yellow-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-yellow-700">Luz</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={statistics.light}>
                <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={2} />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <p>Promedio: {calculateAverage(statistics.light)} lx</p>
              <p>Máximo: {findMaxMin(statistics.light).max} lx</p>
              <p>Mínimo: {findMaxMin(statistics.light).min} lx</p>
            </div>
          </div>
        </div>

        {/* Gráficos adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Gráfico de barras de temperatura */}
          <div className="bg-orange-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="text-orange-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-orange-700">Temperatura Histórica</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statistics.temperature}>
                <Bar dataKey="value" fill="#f97316" />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de barras de humedad */}
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="text-blue-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-blue-700">Humedad Histórica</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statistics.humidity}>
                <Bar dataKey="value" fill="#3b82f6" />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de barras de luz */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="text-yellow-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-yellow-700">Luz Histórica</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statistics.light}>
              <Bar dataKey="value" fill="#fbbf24" />
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de área para tendencias */}
        <div className="bg-green-50 p-4 rounded-lg shadow mt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-green-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-green-700">Tendencias de Temperatura</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={statistics.temperature}>
              <Area type="monotone" dataKey="value" stroke="#34d399" fill="#bbf7d0" />
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Comparación entre cultivos */}
        <div className="bg-purple-50 p-4 rounded-lg shadow mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="text-purple-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-purple-700">Comparación de Temperatura entre Cultivos</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockCultivosStatistics.Cultivo1.temperature.map((item, index) => ({
              day: item.day,
              Cultivo1: item.value,
              Cultivo2: mockCultivosStatistics.Cultivo2.temperature[index].value,
            }))}>
              <Line type="monotone" dataKey="Cultivo1" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="Cultivo2" stroke="#ec4899" strokeWidth={2} />
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsModule;