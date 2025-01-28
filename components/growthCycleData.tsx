'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Leaf, Sprout, Clock, Menu, RefreshCw, Droplets, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from './ui/alert-dialog';
import SideMenu from '../components/SideMenu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Tipos mejorados
type CultivationType = 'soil' | 'hydroponic';

type SensorData = {
  temperature: number;
  humidity: number;
  light: number;
  ph: number;
  ec?: number; // Conductividad eléctrica para hidropónicos
  tds?: number; // Total de sólidos disueltos para hidropónicos
  do?: number; // Oxígeno disuelto para hidropónicos
};

type SensorRanges = {
  temperature: { min: number; max: number; unit: string };
  humidity: { min: number; max: number; unit: string };
  light: { min: number; max: number; unit: string };
  ph: { min: number; max: number; unit: string };
  ec?: { min: number; max: number; unit: string };
  tds?: { min: number; max: number; unit: string };
  do?: { min: number; max: number; unit: string };
};

type Stage = {
  name: string;
  days: string;
  tasks: string[];
  sensorRanges: SensorRanges;
};

type CropData = {
  duration: number;
  cultivationType: CultivationType;
  stages: Stage[];
  sensorRanges: SensorRanges;
};

// Datos de cultivos mejorados
const growthCycleData: { [key: string]: CropData } = {
  'Tomate Cherry': {
    duration: 65,
    cultivationType: 'hydroponic',
    stages: [
      {
        name: 'Germinación',
        days: '5-10',
        tasks: [
          'Mantener temperatura 20-25°C',
          'Humedad alta (80-90%)',
          'Verificar EC 1.0-1.2 mS/cm',
          'Monitorear pH 5.5-6.0',
          'Asegurar oxigenación del agua'
        ],
        sensorRanges: {
          temperature: { min: 20, max: 25, unit: '°C' },
          humidity: { min: 80, max: 90, unit: '%' },
          light: { min: 14, max: 16, unit: 'horas' },
          ph: { min: 5.5, max: 6.0, unit: 'pH' },
          ec: { min: 1.0, max: 1.2, unit: 'mS/cm' },
          tds: { min: 500, max: 600, unit: 'ppm' },
          do: { min: 5, max: 6, unit: 'mg/L' }
        }
      },
      // ... otras etapas con sus rangos específicos
    ],
    sensorRanges: {
      temperature: { min: 20, max: 26, unit: '°C' },
      humidity: { min: 60, max: 70, unit: '%' },
      light: { min: 14, max: 16, unit: 'horas' },
      ph: { min: 5.5, max: 6.8, unit: 'pH' },
      ec: { min: 2.0, max: 3.5, unit: 'mS/cm' },
      tds: { min: 1000, max: 1750, unit: 'ppm' },
      do: { min: 5, max: 6, unit: 'mg/L' }
    }
  },
  // ... otros cultivos
};

const CropPlanningModule: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomate Cherry');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24,
    humidity: 65,
    light: 12,
    ph: 6.5,
    ec: 2.5,
    tds: 1250,
    do: 5.5
  });
  const [tasksCompleted, setTasksCompleted] = useState<boolean[]>([]);

  const cropInfo = growthCycleData[selectedCrop];
  const currentStageInfo = cropInfo.stages[currentStage];

  // Generar datos de crecimiento mejorados
  const generateGrowthData = () => {
    const duration = cropInfo.duration;
    return Array.from({ length: duration }, (_, i) => {
      const day = i + 1;
      const stage = getStageForDay(day, cropInfo.stages);
      const height = calculateHeight(day, cropInfo);
      return { day, height, stage };
    });
  };

  const calculateHeight = (day: number, cropData: CropData) => {
    // Implementar una curva de crecimiento más realista basada en la etapa
    const maxHeight = cropData.cultivationType === 'hydroponic' ? 200 : 150;
    return (1 - Math.exp(-day / 20)) * maxHeight;
  };

  const getStageForDay = (day: number, stages: Stage[]): string => {
    let accumulated = 0;
    for (const stage of stages) {
      const [min, max] = stage.days.split('-').map(Number);
      accumulated += max;
      if (day <= accumulated) return stage.name;
    }
    return stages[stages.length - 1].name;
  };

  // Verificar alertas de sensores
  const checkSensorAlerts = (data: SensorData, ranges: SensorRanges) => {
    const alerts = [];
    for (const [key, value] of Object.entries(data)) {
      const range = ranges[key as keyof SensorRanges];
      if (range && (value < range.min || value > range.max)) {
        alerts.push({
          sensor: key,
          value,
          range,
          message: `${key} fuera de rango: ${value} ${range.unit} (Rango ideal: ${range.min}-${range.max} ${range.unit})`
        });
      }
    }
    return alerts;
  };

  const handleTaskCompletion = (taskIndex: number) => {
    const updatedTasks = [...tasksCompleted];
    updatedTasks[taskIndex] = !updatedTasks[taskIndex];
    setTasksCompleted(updatedTasks);
  };

  // Simulación de actualización de sensores
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5),
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 2)),
        ph: Math.max(0, Math.min(14, prev.ph + (Math.random() - 0.5) * 0.1)),
        ec: prev.ec ? prev.ec + (Math.random() - 0.5) * 0.1 : undefined,
        tds: prev.tds ? prev.tds + (Math.random() - 0.5) * 10 : undefined,
        do: prev.do ? Math.max(0, prev.do + (Math.random() - 0.5) * 0.1) : undefined
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const growthData = generateGrowthData();
  const sensorAlerts = checkSensorAlerts(sensorData, cropInfo.sensorRanges);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8 flex">
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} user={null} />

      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button onClick={() => setIsSideMenuOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-green-700">Planificación de Cultivos</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar size={20} className="mr-2" />
              Calendario
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <RefreshCw size={20} className="mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Selector de cultivo */}
        <div className="flex items-center gap-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          >
            {Object.keys(growthCycleData).map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            {cropInfo.cultivationType === 'hydroponic' ? 'Hidropónico' : 'Suelo'}
          </span>
        </div>

        {/* Panel de sensores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="mr-2" />
              Datos de Sensores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(sensorData).map(([key, value]) => {
                const range = cropInfo.sensorRanges[key as keyof SensorRanges];
                if (!range) return null;
                
                const isOutOfRange = value < range.min || value > range.max;
                return (
                  <div
                    key={key}
                    className={`p-4 rounded-lg ${
                      isOutOfRange ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                    } border`}
                  >
                    <p className="font-semibold capitalize">{key}</p>
                    <p className="text-2xl">{typeof value === 'number' ? value.toFixed(1) : value}</p>
                    <p className="text-sm text-gray-600">
                      Rango: {range.min}-{range.max} {range.unit}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de crecimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sprout className="mr-2" />
              Curva de Crecimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    label={{ value: 'Días', position: 'bottom' }} 
                  />
                  <YAxis 
                    label={{ value: 'Altura (cm)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    content={({ payload, label }) => {
                      if (payload && payload[0]) {
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p className="font-semibold">Día {label}</p>
                            <p>Altura: cm</p>
                            <p>Etapa: {payload[0].payload.stage}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={false}
                  />
                  {cropInfo.stages.map((stage, index) => {
                    const [minDays] = stage.days.split('-').map(Number);
                    return (
                      <ReferenceLine
                        key={index}
                        x={minDays}
                        stroke="#FF6B6B"
                        strokeDasharray="3 3"
                        label={{
                          value: stage.name,
                          position: 'top',
                          fill: '#FF6B6B'
                        }}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Etapas de crecimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" />
              Etapas de Crecimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropInfo.stages.map((stage, index) => (
                <div
                  key={stage.name}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    currentStage === index ? 'bg-green-100' : 'bg-gray-50 hover:bg-green-50'
                  }`}
                  onClick={() => setCurrentStage(index)}
                >
                  <h3 className="font-semibold text-lg mb-2">{stage.name}</h3>
                  <p className="text-gray-600 mb-2">Duración: {stage.days} días</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {Object.entries(stage.sensorRanges).map(([key, range]) => (
                        <div key={key} className="bg-white p-3 rounded-lg border">
                          <p className="font-medium capitalize">{key}</p>
                          <p className="text-sm text-gray-600">
                            Rango ideal: {range.min}-{range.max} {range.unit}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Tareas:</h4>
                      {stage.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={tasksCompleted[taskIndex] || false}
                            onChange={() => handleTaskCompletion(taskIndex)}
                            className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                          />
                          <span className={`${
                            tasksCompleted[taskIndex] ? 'line-through text-gray-500' : 'text-gray-700'
                          }`}>
                            {task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recomendaciones específicas para cultivo hidropónico */}
        {cropInfo.cultivationType === 'hydroponic' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="mr-2" />
                Recomendaciones Hidropónicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Mantenimiento del Sistema</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Verificar el flujo de agua y funcionamiento de bombas diariamente</li>
                    <li>Limpiar filtros y sistemas de aireación semanalmente</li>
                    <li>Monitorear la temperatura de la solución nutritiva</li>
                    <li>Mantener los niveles de EC y pH en el rango óptimo</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Control de la Solución Nutritiva</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Cambiar la solución nutritiva cada 7-14 días</li>
                    <li>Ajustar la EC según la etapa de crecimiento</li>
                    <li>Mantener la temperatura de la solución entre 18-22°C</li>
                    <li>Verificar los niveles de oxígeno disuelto</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prevención de Problemas</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Inspeccionar raíces regularmente para detectar enfermedades</li>
                    <li>Mantener el área de cultivo limpia y desinfectada</li>
                    <li>Verificar el funcionamiento de los sistemas de respaldo</li>
                    <li>Documentar cambios en los parámetros del sistema</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropPlanningModule;