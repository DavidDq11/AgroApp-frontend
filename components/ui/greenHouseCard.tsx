import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Thermometer, Droplets, Activity, ArrowUpDown, Sprout } from 'lucide-react';

interface CultivoData {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;
  diasRestantes: number;
}

const GreenhouseCard = ({ 
  id, 
  cultivoData,
  onClick 
}: { 
  id: number;
  cultivoData: CultivoData;
  onClick: () => void;
}) => {
  const [sensorData, setSensorData] = useState({
    ph: 6.0,
    ec: 1.5,
    temp: 22.0,
    waterLevel: 80
  });

  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        ph: Number((sensorData.ph + (Math.random() - 0.5) * 0.1).toFixed(1)),
        ec: Number((sensorData.ec + (Math.random() - 0.5) * 0.1).toFixed(2)),
        temp: Number((sensorData.temp + (Math.random() - 0.5) * 0.2).toFixed(1)),
        waterLevel: Number((sensorData.waterLevel + (Math.random() - 0.5)).toFixed(1))
      };

      setSensorData(newData);
      setHistoricalData(prev => [...prev, {
        ...newData,
        timestamp: new Date().toLocaleTimeString()
      }].slice(-10));
    }, 3000);

    return () => clearInterval(interval);
  }, [sensorData]);

  const getSensorStatus = (value: number, type: string) => {
    const ranges = {
      ph: { min: 5.5, max: 6.5 },
      ec: { min: 1.2, max: 1.8 },
      temp: { min: 20, max: 25 },
      waterLevel: { min: 60, max: 100 }
    };

    const range = ranges[type as keyof typeof ranges];
    return value >= range.min && value <= range.max ? 'normal' : 'warning';
  };

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm" onClick={onClick}>
    <CardHeader className="border-b border-gray-100 p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-lg font-semibold text-green-700 mb-1">
            {cultivoData.nombre}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sprout className="w-4 h-4" />
            <span>{cultivoData.tipo}</span>
            <span className="text-gray-400">•</span>
            <span>Invernadero {id}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          cultivoData.estado === 'En crecimiento' ? 'bg-green-100 text-green-700' :
          cultivoData.estado === 'Germinación' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {cultivoData.estado}
        </span>
      </div>
    </CardHeader>
    <CardContent className="p-3 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4"> {/* Ajuste aquí para pantallas pequeñas */}
        {/* pH */}
        <div className={`p-2 sm:p-3 rounded-lg ${
          getSensorStatus(sensorData.ph, 'ph') === 'normal' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-yellow-50 text-yellow-700'
        }`}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-base font-medium">pH</span>
          </div>
          <span className="text-base sm:text-lg font-bold">{sensorData.ph}</span>
        </div>
  
        {/* EC */}
        <div className={`p-2 sm:p-3 rounded-lg ${
          getSensorStatus(sensorData.ec, 'ec') === 'normal'
            ? 'bg-green-50 text-green-700'
            : 'bg-yellow-50 text-yellow-700'
        }`}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-base font-medium">EC</span>
          </div>
          <span className="text-base sm:text-lg font-bold">{sensorData.ec}</span>
        </div>
  
        {/* Temperatura */}
        <div className={`p-2 sm:p-3 rounded-lg ${
          getSensorStatus(sensorData.temp, 'temp') === 'normal'
            ? 'bg-green-50 text-green-700'
            : 'bg-yellow-50 text-yellow-700'
        }`}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <Thermometer className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-base font-medium">Temp</span>
          </div>
          <span className="text-base sm:text-lg font-bold">{sensorData.temp}°C</span>
        </div>
  
        {/* Nivel de Agua */}
        <div className={`p-2 sm:p-3 rounded-lg ${
          getSensorStatus(sensorData.waterLevel, 'waterLevel') === 'normal'
            ? 'bg-green-50 text-green-700'
            : 'bg-yellow-50 text-yellow-700'
        }`}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-base font-medium">Nivel</span>
          </div>
          <span className="text-base sm:text-lg font-bold">{sensorData.waterLevel}%</span>
        </div>
      </div>
  
      <div className="h-32 sm:h-40 w-full mt-4"> {/* Ajuste la altura para pantallas pequeñas */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historicalData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={false} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ fontSize: '12px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#8884d8" 
              dot={false}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="ec" 
              stroke="#82ca9d" 
              dot={false}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#ffc658" 
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
  );
};

export default GreenhouseCard;