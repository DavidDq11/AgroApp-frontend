import React from 'react';

interface Cultivo {
  id: number;
  nombre: string;
  estado: string;
  temperatura: number;
  humedad: number;
  luminosidad: number;
}

interface CultivoCardProps {
  cultivo: Cultivo;
  onSelect: (cultivo: Cultivo) => void; // Función para manejar la selección del cultivo
}

const CultivoCard: React.FC<CultivoCardProps> = ({ cultivo, onSelect }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300" 
      onClick={() => onSelect(cultivo)} // Selecciona el cultivo al hacer clic
    >
      <h4 className="text-xl font-semibold text-green-700">{cultivo.nombre}</h4>
      <p className="text-gray-600">Estado: {cultivo.estado}</p>
      <p className="text-gray-600">Temperatura: {cultivo.temperatura}°C</p>
      <p className="text-gray-600">Humedad: {cultivo.humedad}%</p>
      <p className="text-gray-600">Luminosidad: {cultivo.luminosidad}%</p>
    </div>
  );
};

export default CultivoCard;
