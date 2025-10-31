import * as React from 'react';

interface CardProps {
    children: React.ReactNode;
    hoverColor?: 'aqua' | 'green' | 'yellow' | 'blue' | 'orange';
    className?: string;
}

export default function Card({ children, hoverColor, className = '' }: CardProps) {
    const hoverColorMap = {
        aqua: 'hover:border-aqua/30',
        green: 'hover:border-green/30',
        yellow: 'hover:border-yellow/30',
        blue: 'hover:border-blue/30',
        orange: 'hover:border-orange/30',
    };
    
    const hoverColorClass = hoverColor ? hoverColorMap[hoverColor] : '';
    
    return (
        <div className={`p-4 rounded-xl bg-bg-2/50 border border-white/5 ${hoverColorClass} transition-colors ${className}`}>
            {children}
        </div>
    );
}
