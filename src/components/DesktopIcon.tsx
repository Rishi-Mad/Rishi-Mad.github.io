import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick, color = "text-white" }) => (
    <motion.button
        onClick={onClick}
        className="flex flex-col items-center space-y-2 text-white text-center group w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95, y: 0 }}
        aria-label={label}
        role="button"
    >
        <motion.div
            className={`p-3 group-hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 group-hover:border-white/20 group-hover:shadow-lg ${color}`}
            whileHover={{ 
                rotate: [0, -5, 5, 0],
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            transition={{ duration: 0.3 }}
        >
            {icon}
        </motion.div>
        <motion.span 
            className="text-xs leading-tight drop-shadow-lg font-medium"
            whileHover={{ scale: 1.05 }}
        >
            {label}
        </motion.span>
    </motion.button>
);