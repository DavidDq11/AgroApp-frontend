import React, { useState, useEffect, useCallback } from 'react';
import { Calendar } from 'react-calendar';
import { Moon, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { growthCycleData } from '../growthCycleData';

// Definir tipos
type StageType = 'Germinación' | 'Desarrollo Vegetativo' | 'Floración' | 'Cosecha';
type LunarPhaseType = 'Luna Nueva' | 'Cuarto Creciente' | 'Luna Llena' | 'Cuarto Menguante';

interface StageColorsType {
  Germinación: string;
  'Desarrollo Vegetativo': string;
  Floración: string;
  Cosecha: string;
}

interface LunarRecommendationsType {
  'Luna Nueva': string;
  'Cuarto Creciente': string;
  'Luna Llena': string;
  'Cuarto Menguante': string;
}

interface EnhancedCropCalendarProps {
  initialDate?: Date;
  selectedCrop?: string;
}

const EnhancedCropCalendar: React.FC<EnhancedCropCalendarProps> = ({ 
  initialDate = new Date(), 
  selectedCrop = 'Tomate Cherry' 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [currentPhase, setCurrentPhase] = useState<StageType>('Germinación');
  const [lunarPhase, setLunarPhase] = useState<LunarPhaseType>('Luna Nueva');
  
  const stageColors: StageColorsType = {
    'Germinación': 'bg-emerald-100',
    'Desarrollo Vegetativo': 'bg-blue-100',
    'Floración': 'bg-yellow-100',
    'Cosecha': 'bg-red-100'
  };

  const lunarRecommendations: LunarRecommendationsType = {
    'Luna Nueva': 'Ideal para siembra de cultivos de hoja',
    'Cuarto Creciente': 'Favorable para trasplantes',
    'Luna Llena': 'Óptimo para cosecha',
    'Cuarto Menguante': 'Buen momento para mantenimiento'
  };

  // Obtener información del cultivo seleccionado
  const cropInfo = growthCycleData[selectedCrop as keyof typeof growthCycleData];

  // Función para calcular la etapa según la fecha
  const getStageForDate = useCallback(
    (date: Date): StageType => {
      if (!cropInfo || !cropInfo.stages) return 'Germinación';

      const start = selectedDate.getTime();
      const current = date.getTime();
      const daysDiff = Math.floor((current - start) / (1000 * 60 * 60 * 24));
  
      let accumulatedDays = 0;
      for (const stage of cropInfo.stages) {
        const [minDays, maxDays] = stage.days.split('-').map(Number);
        accumulatedDays += maxDays;
        
        if (daysDiff <= accumulatedDays) {
          return stage.name as StageType;
        }
      }
      
      return 'Cosecha';
    },
    [selectedDate, cropInfo]
  );

  // Función para obtener la fase lunar
  const getLunarPhase = useCallback((date: Date): LunarPhaseType => {
    const phases: LunarPhaseType[] = ["Luna Nueva", "Cuarto Creciente", "Luna Llena", "Cuarto Menguante"];
    const dayOfMonth = date.getDate();
    return phases[Math.floor((dayOfMonth % 28) / 7)];
  }, []);

  // Personalización del calendario
  const tileClassName = ({ date }: { date: Date }): string => {
    const stage = getStageForDate(date);
    return `${stageColors[stage]} hover:opacity-80`;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const phase = getLunarPhase(date);
    return (
      <div className="flex flex-col items-center">
        <Moon className="w-4 h-4" />
        <span className="text-xs">{phase}</span>
      </div>
    );
  };

  // Manejador de cambio de fecha
  const handleDateChange = (value: Date | Date[], event?: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  // Actualizar fase actual cuando cambia la fecha
  useEffect(() => {
    const currentStage = getStageForDate(selectedDate);
    const currentLunarPhase = getLunarPhase(selectedDate);
    setCurrentPhase(currentStage);
    setLunarPhase(currentLunarPhase);
  }, [selectedDate, getStageForDate, getLunarPhase]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Calendario de Cultivo: {selectedCrop}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Calendar
              onChange={(value, event) => handleDateChange(value as Date | Date[], event)}
              value={selectedDate}
              tileClassName={tileClassName}
              tileContent={tileContent}
              className="w-full border rounded-lg p-4"
            />

            <div className="flex flex-wrap gap-2">
              {(Object.entries(stageColors) as [StageType, string][]).map(([stage, color]) => (
                <div key={stage} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${color}`} />
                  <span className="text-sm">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Alert variant="warning">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Etapa Actual</AlertTitle>
              <AlertDescription>{currentPhase}</AlertDescription>
            </Alert>

            <Alert variant="info">
              <Moon className="w-4 h-4" />
              <AlertTitle>Fase Lunar</AlertTitle>
              <AlertDescription>
                {lunarPhase}
                <p className="mt-2 text-sm">{lunarRecommendations[lunarPhase]}</p>
              </AlertDescription>
            </Alert>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tareas Recomendadas</h3>
              <ul className="space-y-2">
                {cropInfo.stages[cropInfo.stages.findIndex(stage => stage.name === currentPhase)]?.tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCropCalendar;