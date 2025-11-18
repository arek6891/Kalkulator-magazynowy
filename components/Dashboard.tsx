
import React from 'react';
import { CalculationResult, WarehouseData } from '../types';
import WorkerChart from './WorkerChart';
import WorkloadChart from './WorkloadChart';
import ChartCard from './ChartCard';
import { Users, AlertCircle, Clock } from 'lucide-react';

interface DashboardProps {
    result: CalculationResult | null;
    inputData: WarehouseData;
}

const Dashboard: React.FC<DashboardProps> = ({ result, inputData }) => {
    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Users size={64} className="text-text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-text">Oczekiwanie na dane</h3>
                <p className="text-text-secondary max-w-sm">
                    Wprowadź dane w formularzu po lewej stronie i kliknij "Oblicz FTE", aby zobaczyć wyniki wg standardów.
                </p>
            </div>
        );
    }
    
    if (result.total === 0 && (inputData.deliveries > 0 || inputData.orders > 0)) {
        return (
             <div className="flex flex-col items-center justify-center h-full bg-card rounded-xl shadow-lg border border-red-200 dark:border-red-800 p-8 text-center">
                <AlertCircle size={64} className="text-red-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-400">Błąd w danych</h3>
                <p className="text-text-secondary max-w-sm">
                    Sprawdź, czy pole "Godziny pracy zmiany" ma wartość większą od zera oraz czy wydajność (np. dostaw na godzinę) nie jest zerowa.
                </p>
            </div>
        )
    }

    const workerData = [
        { name: 'Odbiór', value: result.receivers },
        { name: 'Kompletacja', value: result.pickers },
        { name: 'Pakowanie', value: result.packers },
    ];
    
    const workloadData = [
        { name: 'Praca', dostawy: inputData.deliveries, zlecenia: inputData.orders }
    ];

    const isSurplus = result.total < inputData.currentEmployees;
    const neededColor = result.needed > 0 ? 'text-primary' : 'text-green-500';

    return (
        <div className="space-y-8">
             <div className="p-6 bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="flex justify-between items-start mb-4">
                     <div className="text-left">
                        <h2 className="text-lg font-semibold text-text-secondary">Zapotrzebowanie (FTE)</h2>
                        <p className="text-xs text-text-secondary">Full Time Equivalent</p>
                     </div>
                     <div className="text-right bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                        <p className="text-xs text-text-secondary flex items-center justify-end gap-1">
                             <Clock size={12} /> Efektywny czas pracy
                        </p>
                        <p className="font-mono font-bold text-text">{result.effectiveWorkHours}h / os.</p>
                     </div>
                </div>

                <p className={`text-6xl font-extrabold my-2 ${neededColor}`}>
                    {result.needed > 0 ? `+${result.needed}` : "0"}
                </p>
                {result.needed > 0 && <p className="text-text-secondary mb-4">dodatkowych pracowników</p>}
                
                 {isSurplus && (
                    <p className="text-green-500 font-semibold -mt-2 mb-4">
                        (Nadmiar pracowników: {inputData.currentEmployees - result.total})
                    </p>
                 )}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 grid grid-cols-3 gap-4 text-text">
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Wymagane</p>
                        <p className="text-2xl font-bold text-primary">{result.total}</p>
                    </div>
                     <div className="flex flex-col items-center border-l border-r border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Obecnie</p>
                        <p className="text-2xl font-bold">{inputData.currentEmployees}</p>
                    </div>
                     <div className="flex flex-col items-center relative group cursor-help">
                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1 underline decoration-dotted">Narzut</p>
                        <p className="text-2xl font-bold text-orange-500">{result.buffer}</p>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-10 shadow-xl">
                            Dodatkowi pracownicy wynikający z przerw ({inputData.breakTime}min) i wydajności ({inputData.processEfficiency}%)
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChartCard title="Podział etatu (FTE)">
                    <WorkerChart data={workerData} />
                </ChartCard>
                <ChartCard title="Wolumen operacyjny">
                    <WorkloadChart data={workloadData} />
                </ChartCard>
            </div>
        </div>
    );
};

export default Dashboard;
