import React from 'react';
import { motion } from 'framer-motion';

interface SettingsContentProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({ theme, setTheme }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Theme</h3>
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                    <input 
                        type="radio" 
                        name="theme" 
                        checked={theme === 'dark'} 
                        onChange={() => setTheme('dark')} 
                    />
                    <span>Dark Mode</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input 
                        type="radio" 
                        name="theme" 
                        checked={theme === 'light'} 
                        onChange={() => setTheme('light')} 
                    />
                    <span>Light Mode</span>
                </label>
            </div>
        </div>
    </motion.div>
);