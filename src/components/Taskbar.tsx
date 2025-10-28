import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Wifi } from 'lucide-react';
import { WindowState } from '../hooks/useWindowManager';

interface TaskbarProps {
    windows: Record<string, WindowState>;
    onWindowClick: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick }) => {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
    const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const windowList = Object.values(windows);

    return (
        <div className="w-full h-12 flex items-center justify-between px-6 flex-shrink-0 z-50 overflow-hidden" role="toolbar" aria-label="Taskbar">
            <div className="flex items-center space-x-2 overflow-hidden">
                <motion.div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0" whileHover={{ scale: 1.1 }}>
                    <Code className="w-4 h-4 text-white" />
                </motion.div>
                {windowList.map((window) => (
                    <motion.button
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                        className={`px-4 py-2 rounded-md text-sm transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-700/50 flex-shrink-0 ${
                            !window.isMinimized ? 'bg-blue-600/50 text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                        }`}
                        aria-label={`${window.isMinimized ? 'Restore' : 'Focus'} ${window.title}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="truncate max-w-[150px]">{window.title}</span>
                    </motion.button>
                ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-300 flex-shrink-0">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded border border-gray-700/50 bg-gray-800/30">
                    <Wifi className="w-4 h-4 text-green-400" />
                    <span>Online</span>
                </div>
                <div className="font-mono bg-gray-800/50 px-3 py-1 rounded border border-gray-700/50">{formatTime(time)}</div>
            </div>
        </div>
    );
};