import * as React from 'react';

interface CardProps {
    children: React.ReactNode;
    hoverColor?: 'aqua' | 'green' | 'yellow' | 'blue' | 'orange';
    className?: string;
}

export default function Card({ children, hoverColor, className = '' }: CardProps) {
    const hoverColorClass = hoverColor ? `hover:border-${hoverColor}/30` : '';
    
    return (
        <div className={`p-4 rounded-xl bg-bg-2/50 border border-white/5 ${hoverColorClass} transition-colors ${className}`}>
            {children}
        </div>
    );
}
