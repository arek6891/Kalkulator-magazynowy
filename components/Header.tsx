
import React from 'react';
import { Warehouse, HelpCircle } from 'lucide-react';

interface HeaderProps {
    onOpenInfo?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenInfo }) => {
    return (
        <header className="bg-card shadow-md border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between pr-16"> {/* pr-16 to avoid overlap with theme toggle */}
                <div className="flex items-center">
                    <Warehouse className="w-8 h-8 text-primary" />
                    <h1 className="ml-3 text-2xl font-bold text-text">
                        Kalkulator Pracowników Magazynu
                    </h1>
                </div>
                {onOpenInfo && (
                    <button 
                        onClick={onOpenInfo}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                        <HelpCircle size={18} />
                        <span className="hidden sm:inline">Jak to działa?</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
