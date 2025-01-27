'use client';

import React, { useState } from 'react';
import { X, Plus, ChevronRight, Thermometer, Droplets, Sun, Leaf } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogDescription
} from './alert-dialog';

// Definición de tipos
type FaseCultivo = 'Germinación' | 'Crecimiento' | 'Cosecha';

interface CultivoPredefinido {
    id: string;
    nombre: string;
    diasRestantes: Record<FaseCultivo, number>;
    temperaturaIdeal: string;
    humedadIdeal: string;
    luzIdeal: string;
}

interface Invernadero {
    id: string;
    nombre: string;
}

interface Sensor {
    id: string;
    nombre: string;
    icono: JSX.Element;
}

const NuevoCultivo: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    const [paso, setPaso] = useState(1);
    const [nombreCultivo, setNombreCultivo] = useState('');
    const [fase, setFase] = useState<FaseCultivo | ''>('');
    const [sensoresSeleccionados, setSensoresSeleccionados] = useState<string[]>([]);
    const [cultivoSeleccionado, setCultivoSeleccionado] = useState('');
    const [invernadero, setInvernadero] = useState('');

    const cultivosPredefinidos: CultivoPredefinido[] = [
        {
            id: 'tomate-cherry',
            nombre: 'Tomate Cherry',
            diasRestantes: {
                'Germinación': 10,
                'Crecimiento': 30,
                'Cosecha': 45
            },
            temperaturaIdeal: '20-25°C',
            humedadIdeal: '60-80%',
            luzIdeal: '75-85%'
        },
        {
            id: 'lechuga-romana',
            nombre: 'Lechuga Romana',
            diasRestantes: {
                'Germinación': 7,
                'Crecimiento': 21,
                'Cosecha': 30
            },
            temperaturaIdeal: '15-20°C',
            humedadIdeal: '65-75%',
            luzIdeal: '70-80%'
        },
    ];

    const invernaderos: Invernadero[] = [
        { id: 'inv1', nombre: 'Invernadero 1' },
        { id: 'inv2', nombre: 'Invernadero 2' },
    ];

    const sensoresDisponibles: Sensor[] = [
        { id: '1', nombre: 'Sensor de Temperatura', icono: <Thermometer className="w-4 h-4" /> },
        { id: '2', nombre: 'Sensor de Humedad', icono: <Droplets className="w-4 h-4" /> },
        { id: '3', nombre: 'Sensor de Luz', icono: <Sun className="w-4 h-4" /> },
    ];

    const cultivoActual = cultivosPredefinidos.find(c => c.id === cultivoSeleccionado);

    const manejarSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (paso < 3) {
            setPaso(paso + 1);
            return;
        }

        if (fase && cultivoActual) {
            console.log('Cultivo guardado:', {
                nombreCultivo,
                fase,
                sensoresSeleccionados,
                cultivoSeleccionado,
                invernadero,
                diasRestantes: cultivoActual.diasRestantes[fase],
            });
        }
        closeModal();
    };

    const [alertOpen, setAlertOpen] = useState(true);

    const renderPaso = () => {
        switch (paso) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Selección de cultivo</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {cultivosPredefinidos.map((cultivo) => (
                                <button
                                    key={cultivo.id}
                                    type="button"
                                    className={`p-4 border rounded-lg text-left transition-all ${cultivoSeleccionado === cultivo.id
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-green-200'
                                        }`}
                                    onClick={() => setCultivoSeleccionado(cultivo.id)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Leaf className={`w-5 h-5 ${cultivoSeleccionado === cultivo.id ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <span className="font-medium">{cultivo.nombre}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Tiempo total: {Object.values(cultivo.diasRestantes).reduce((a, b) => a + b, 0)} días
                                    </div>
                                </button>
                            ))}
                        </div>

                        {cultivoActual && (
                            <div className="mt-4 bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-700 mb-2">Condiciones ideales:</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Thermometer className="text-orange-500" />
                                        <span className="text-sm">{cultivoActual.temperaturaIdeal}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Droplets className="text-blue-500" />
                                        <span className="text-sm">{cultivoActual.humedadIdeal}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Sun className="text-yellow-500" />
                                        <span className="text-sm">{cultivoActual.luzIdeal}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Configuración inicial</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del cultivo
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    value={nombreCultivo}
                                    onChange={(e) => setNombreCultivo(e.target.value)}
                                    placeholder={`Ej: Mis ${cultivoActual?.nombre || 'plantas'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invernadero
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    value={invernadero}
                                    onChange={(e) => setInvernadero(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccionar invernadero</option>
                                    {invernaderos.map((inv) => (
                                        <option key={inv.id} value={inv.id}>{inv.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fase inicial
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {cultivoActual && Object.keys(cultivoActual.diasRestantes).map((faseOpt) => (
                                        <button
                                            key={faseOpt}
                                            type="button"
                                            className={`p-3 border rounded-lg text-center transition-all ${fase === faseOpt
                                                    ? 'border-green-500 bg-green-50 text-green-700'
                                                    : 'border-gray-200 hover:border-green-200'
                                                }`}
                                            onClick={() => setFase(faseOpt as FaseCultivo)}
                                        >
                                            {faseOpt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Configuración de sensores</h3>
                        <div className="space-y-4">
                            {sensoresDisponibles.map((sensor) => (
                                <label
                                    key={sensor.id}
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${sensoresSeleccionados.includes(sensor.id)
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-green-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {sensor.icono}
                                        <span>{sensor.nombre}</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={sensoresSeleccionados.includes(sensor.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSensoresSeleccionados([...sensoresSeleccionados, sensor.id]);
                                            } else {
                                                setSensoresSeleccionados(sensoresSeleccionados.filter(id => id !== sensor.id));
                                            }
                                        }}
                                        className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                                    />
                                </label>
                            ))}
                        </div>
                        {sensoresSeleccionados.length === 0 && alertOpen && (
                            <div className="mt-4">
                                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <AlertDialogDescription className="text-gray-600">
                                                Se recomienda seleccionar al menos un sensor para monitorear tu cultivo.
                                            </AlertDialogDescription>
                                            <button
                                                className="text-sm text-red-500"
                                                onClick={() => setAlertOpen(false)}
                                            >
                                                Cerrar
                                            </button>
                                        </AlertDialogHeader>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 className="text-xl font-semibold text-green-700">Nuevo cultivo</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`h-2 w-8 rounded-full ${paso >= 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                            <div className={`h-2 w-8 rounded-full ${paso >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} />
                            <div className={`h-2 w-8 rounded-full ${paso >= 3 ? 'bg-green-500' : 'bg-gray-200'}`} />
                        </div>
                    </div>
                    <button onClick={closeModal}>
                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                <form onSubmit={manejarSubmit}>
                    <div className="p-6">
                        {renderPaso()}
                    </div>

                    <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                        {paso > 1 && (
                            <button
                                type="button"
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                onClick={() => setPaso(paso - 1)}
                            >
                                Anterior
                            </button>
                        )}
                        <button
                            type="submit"
                            className="ml-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                            disabled={
                                (paso === 1 && !cultivoSeleccionado) ||
                                (paso === 2 && (!nombreCultivo || !fase || !invernadero))
                            }
                        >
                            {paso === 3 ? 'Guardar cultivo' : 'Siguiente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevoCultivo;