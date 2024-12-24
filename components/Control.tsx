'use client';

import React, { useState } from 'react';
import { Thermometer, Droplets, Sun, Zap, Save, Menu, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SideMenu from './SideMenu';

interface SensorLimits {
  min: number;
  max: number;
}

interface CropLimits {
  temperatura: SensorLimits;
  humedad: SensorLimits;
  luminosidad: SensorLimits;
  ph: SensorLimits;
  conductividad: SensorLimits;
}

interface HistoricalData {
  day: string;
  value: number;
}

interface CropData {
  limites: CropLimits;
  historico: {
    temperatura: HistoricalData[];
    humedad: HistoricalData[];
    luminosidad: HistoricalData[];
    ph: HistoricalData[];
    conductividad: HistoricalData[];
  };
}

interface MockDataType {
  [key: string]: CropData;
}

interface SensorValues {
  temperatura: number;
  humedad: number;
  luminosidad: number;
  ph: number;
  conductividad: number;
}

interface AlertSettings {
  [key: string]: { enabled: boolean };
}

interface SensorCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  limites: SensorLimits;
  alertEnabled: boolean;
}

const mockData: MockDataType = {
  lechuga: {
    limites: {
      temperatura: { min: 20, max: 25 },
      humedad: { min: 60, max: 70 },
      luminosidad: { min: 70, max: 85 },
      ph: { min: 5.5, max: 6.5 },
      conductividad: { min: 1.2, max: 1.8 }
    },
    historico: {
      temperatura: [
        { day: 'Lun', value: 22 },
        { day: 'Mar', value: 23 },
        { day: 'Mié', value: 24 },
        { day: 'Jue', value: 22 },
        { day: 'Vie', value: 23 }
      ],
      humedad: [
        { day: 'Lun', value: 65 },
        { day: 'Mar', value: 66 },
        { day: 'Mié', value: 67 },
        { day: 'Jue', value: 65 },
        { day: 'Vie', value: 66 }
      ],
      luminosidad: [
        { day: 'Lun', value: 75 },
        { day: 'Mar', value: 76 },
        { day: 'Mié', value: 77 },
        { day: 'Jue', value: 75 },
        { day: 'Vie', value: 76 }
      ],
      ph: [
        { day: 'Lun', value: 6.0 },
        { day: 'Mar', value: 6.1 },
        { day: 'Mié', value: 6.2 },
        { day: 'Jue', value: 6.0 },
        { day: 'Vie', value: 6.1 }
      ],
      conductividad: [
        { day: 'Lun', value: 1.5 },
        { day: 'Mar', value: 1.6 },
        { day: 'Mié', value: 1.7 },
        { day: 'Jue', value: 1.5 },
        { day: 'Vie', value: 1.6 }
      ]
    }
  },
  tomate: {
    limites: {
      temperatura: { min: 22, max: 28 },
      humedad: { min: 65, max: 75 },
      luminosidad: { min: 75, max: 90 },
      ph: { min: 5.8, max: 6.8 },
      conductividad: { min: 2.0, max: 2.5 }
    },
    historico: {
      temperatura: [
        { day: 'Lun', value: 24 },
        { day: 'Mar', value: 25 },
        { day: 'Mié', value: 26 },
        { day: 'Jue', value: 24 },
        { day: 'Vie', value: 25 }
      ],
      humedad: [
        { day: 'Lun', value: 70 },
        { day: 'Mar', value: 71 },
        { day: 'Mié', value: 72 },
        { day: 'Jue', value: 70 },
        { day: 'Vie', value: 71 }
      ],
      luminosidad: [
        { day: 'Lun', value: 80 },
        { day: 'Mar', value: 81 },
        { day: 'Mié', value: 82 },
        { day: 'Jue', value: 80 },
        { day: 'Vie', value: 81 }
      ],
      ph: [
        { day: 'Lun', value: 6.2 },
        { day: 'Mar', value: 6.3 },
        { day: 'Mié', value: 6.4 },
        { day: 'Jue', value: 6.2 },
        { day: 'Vie', value: 6.3 }
      ],
      conductividad: [
        { day: 'Lun', value: 2.2 },
        { day: 'Mar', value: 2.3 },
        { day: 'Mié', value: 2.4 },
        { day: 'Jue', value: 2.2 },
        { day: 'Vie', value: 2.3 }
      ]
    }
  }
};

const SensorCard: React.FC<SensorCardProps> = ({ icon, label, value, unit, limites, alertEnabled }) => {
  const sensorKey = label.toLowerCase() as keyof CropData['historico'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        {icon}
        <div className="flex items-center gap-2">
          <span className="font-medium">{value.toFixed(1)}{unit}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertEnabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Min: {limites.min}</span>
          <span>Max: {limites.max}</span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={mockData.lechuga.historico[sensorKey]}>
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            <XAxis dataKey="day" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ControlSensores: React.FC = () => {
  const [cultivo, setCultivo] = useState<string>('lechuga');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [valores, setValores] = useState<SensorValues>({
    temperatura: 22,
    humedad: 65,
    luminosidad: 80,
    ph: 6.0,
    conductividad: 1.5
  });
  const [alertas, setAlertas] = useState<AlertSettings>({
    temperatura: { enabled: true },
    humedad: { enabled: true },
    luminosidad: { enabled: true },
    ph: { enabled: true },
    conductividad: { enabled: true }
  });

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setValores({
        temperatura: Math.random() * (25 - 20) + 20,
        humedad: Math.random() * (70 - 60) + 60,
        luminosidad: Math.random() * (85 - 70) + 70,
        ph: Math.random() * (6.5 - 5.5) + 5.5,
        conductividad: Math.random() * (1.8 - 1.2) + 1.2
      });
      setLoading(false);
    }, 1000);
  };

  const handleSave = () => {
    console.log('Guardando configuración:', { cultivo, valores, alertas });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8">
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} user={null} />
      
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setIsSideMenuOpen(true)} className="text-gray-600">
          <Menu size={24} />
        </button>
        <h1 className="text-3xl font-bold text-green-700">Control de Sensores</h1>
        <div className="flex gap-4">
          <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save size={20} />
            Guardar
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={cultivo}
          onChange={(e) => setCultivo(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="lechuga">Lechuga</option>
          <option value="tomate">Tomate</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorCard
          icon={<Thermometer className="w-6 h-6 text-orange-500" />}
          label="Temperatura"
          value={valores.temperatura}
          unit="°C"
          limites={mockData[cultivo].limites.temperatura}
          alertEnabled={alertas.temperatura.enabled}
        />
        <SensorCard
          icon={<Droplets className="w-6 h-6 text-blue-500" />}
          label="Humedad"
          value={valores.humedad}
          unit="%"
          limites={mockData[cultivo].limites.humedad}
          alertEnabled={alertas.humedad.enabled}
        />
        <SensorCard
          icon={<Sun className="w-6 h-6 text-yellow-500" />}
          label="Luminosidad"
          value={valores.luminosidad}
          unit="%"
          limites={mockData[cultivo].limites.luminosidad}
          alertEnabled={alertas.luminosidad.enabled}
        />
        <SensorCard
          icon={<Zap className="w-6 h-6 text-purple-500" />}
          label="pH"
          value={valores.ph}
          unit=""
          limites={mockData[cultivo].limites.ph}
          alertEnabled={alertas.ph.enabled}
        />
        <SensorCard
          icon={<Sun className="w-6 h-6 text-green-500" />}
          label="Conductividad"
          value={valores.conductividad}
          unit="mS/cm"
          limites={mockData[cultivo].limites.conductividad}
          alertEnabled={alertas.conductividad.enabled}
        />
      </div>
    </div>
  );
};

export default ControlSensores;