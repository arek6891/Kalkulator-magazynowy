
import React from 'react';
import { WarehouseData } from '../types';
import InputField from './InputField';
import Button from './Button';
import { Package, Truck, Download, Settings } from 'lucide-react';

interface CalculatorFormProps {
    data: WarehouseData;
    setData: React.Dispatch<React.SetStateAction<WarehouseData>>;
    onCalculate: () => void;
    onImport: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ data, setData, onCalculate, onImport }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value === '' ? '' : Number(value)
        }));
    };

    return (
        <div className="p-6 bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
            <h2 className="text-2xl font-bold mb-6 text-text">Wprowadź dane</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }} className="space-y-6">
                <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <legend className="text-lg font-semibold flex items-center gap-2 mb-3 text-text">
                        <Truck size={20} className="text-primary" />
                        Dostawy
                    </legend>
                    <div className="space-y-4">
                        <InputField label="Ilość dostaw (dziennie)" name="deliveries" value={data.deliveries} onChange={handleChange} />
                        <InputField label="Śr. ilość art. w dostawie" name="itemsPerDelivery" value={data.itemsPerDelivery} onChange={handleChange} />
                        <InputField label="Dostaw na godz./pracownika" name="deliveriesPerHour" value={data.deliveriesPerHour} onChange={handleChange} />
                    </div>
                </fieldset>
                
                <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-4">
                     <legend className="text-lg font-semibold flex items-center gap-2 mb-3 text-text">
                        <Package size={20} className="text-primary" />
                        Zlecenia
                    </legend>
                    <div className="space-y-4">
                        <InputField label="Ilość zleceń (dziennie)" name="orders" value={data.orders} onChange={handleChange} />
                        <InputField label="Śr. ilość art. w zleceniu" name="itemsPerOrder" value={data.itemsPerOrder} onChange={handleChange} />
                        <InputField label="Sztuk zebranych na godz./pracownika" name="itemsPickedPerHour" value={data.itemsPickedPerHour} onChange={handleChange} />
                        <InputField label="Zleceń spakowanych na godz./pracownika" name="ordersPackedPerHour" value={data.ordersPackedPerHour} onChange={handleChange} />
                    </div>
                </fieldset>
                
                <fieldset className="border-t border-gray-200 dark:border-gray-700 pt-4">
                     <legend className="text-lg font-semibold flex items-center gap-2 mb-3 text-text">
                        <Settings size={20} className="text-primary" />
                        Parametry Pracy (Standardy)
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Godziny pracy zmiany" name="workHours" value={data.workHours} onChange={handleChange} />
                        <InputField label="Obecna liczba pracowników" name="currentEmployees" value={data.currentEmployees} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <InputField label="Czas przerw (minuty)" name="breakTime" value={data.breakTime} onChange={handleChange} />
                        <InputField label="Wydajność procesu (%)" name="processEfficiency" value={data.processEfficiency} onChange={handleChange} />
                    </div>
                    <p className="text-xs text-text-secondary mt-2">
                        * Standard logistyczny zakłada ok. 15-30 min przerwy i 85-90% OEE (efektywności).
                    </p>
                </fieldset>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button type="submit" fullWidth>Oblicz FTE</Button>
                    <Button onClick={onImport} variant="secondary" fullWidth type="button">
                        <Download size={16} className="mr-2"/>
                        Przykładowe dane
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CalculatorForm;
