import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface TabData {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface TabBarProps {
    tabs: Record<string, TabData>;
    activeTabId: string | null;
    onSelectTab: (id: string) => void;
    onCloseTab: (id: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onSelectTab, onCloseTab }) => {
    if (!tabs || Object.keys(tabs).length === 0) return null;
    return (
        <div className="flex items-center border-b border-gray-700/50 bg-gray-800/30 overflow-x-auto">
            <AnimatePresence initial={false} mode="popLayout">
                {Object.values(tabs).map((tab: TabData) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => onSelectTab(tab.id)}
                        className={`flex-shrink-0 flex items-center justify-between px-4 py-2 text-sm cursor-pointer border-r border-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTabId === tab.id ? 'bg-blue-600/30 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700/40 hover:text-gray-300'}`}
                        aria-selected={activeTabId === tab.id}
                        role="tab"
                        tabIndex={0}
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                            type: 'spring', 
                            stiffness: 300, 
                            damping: 25,
                            duration: 0.2
                        }}
                    >
                        <span className="mr-3 truncate">{tab.title}</span>
                        <motion.button onClick={(e: React.MouseEvent) => { e.stopPropagation(); onCloseTab(tab.id); }} className="p-1 rounded-full hover:bg-red-500/50" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label={`Close ${tab.title} tab`}>
                            <X className="w-4 h-4" />
                        </motion.button>
                    </motion.button>
                ))}
            </AnimatePresence>
        </div>
    );
};