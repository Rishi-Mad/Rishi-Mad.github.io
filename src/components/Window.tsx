import React, { useRef, useEffect, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TabBar } from './TabBar';
import Draggable from 'react-draggable';

interface TabData {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface WindowProps {
    isMaximized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    tabs: Record<string, TabData>;
    activeTabId: string | null;
    onSelectTab: (id: string) => void;
    onCloseTab: (id: string) => void;
}

export const Window: React.FC<WindowProps> = ({ isMaximized, onClose, onMinimize, onMaximize, tabs, activeTabId, onSelectTab, onCloseTab }) => {
    const variants = {
        hidden: { opacity: 0, scale: 0.8, y: 40 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.8, y: -40, transition: { duration: 0.3 } }
    };

    const activeTabData = activeTabId ? tabs[activeTabId] : null;
    const currentTitle = activeTabData ? activeTabData.title : 'Portfolio';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    // Ref for centering window
    const windowRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isMobile && windowRef.current) {
            // Center window only on open/maximize, not on tab changes
            const el = windowRef.current;
            const parent = el.parentElement as HTMLElement | null;
            if (parent) {
                el.style.left = `${(parent.offsetWidth - el.offsetWidth) / 2}px`;
                el.style.top = `${(parent.offsetHeight - el.offsetHeight) / 2}px`;
            }
        }
    }, [isMobile, isMaximized]); // Removed activeTabId dependency

    // Desktop/Tablet window content
    const windowContent = (
        <motion.div
            ref={windowRef}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex flex-col glass-dark rounded-2xl shadow-2xl border border-blue-500/20 w-full max-w-5xl h-5/6 max-h-[900px] neon-glow`}
            role="dialog"
            aria-label={currentTitle}
        >
            <div className={`flex items-center justify-between p-4 glass-light rounded-t-2xl border-b border-gray-700/20 flex-shrink-0 cursor-move ${isMobile ? 'gap-2' : ''}`} id="window-drag-handle">
                <div className="flex items-center space-x-2">
                    <motion.button onClick={onClose} className={`rounded-full bg-red-500 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-400 ${isMobile ? 'w-6 h-6' : 'w-3.5 h-3.5'}`} whileHover={{ scale: 1.1 }} aria-label="Close window"><X className={isMobile ? 'w-4 h-4' : 'w-2 h-2 text-black/50'} /></motion.button>
                    <motion.button onClick={onMinimize} className={`rounded-full bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${isMobile ? 'w-6 h-6' : 'w-3.5 h-3.5'}`} whileHover={{ scale: 1.1 }} aria-label="Minimize window"/>
                    <motion.button onClick={onMaximize} className={`rounded-full bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 ${isMobile ? 'w-6 h-6' : 'w-3.5 h-3.5'}`} whileHover={{ scale: 1.1 }} aria-label="Maximize window"/>
                </div>
                <span className="font-semibold text-sm text-white truncate px-4">{currentTitle}</span>
                <div className="w-20"></div>
            </div>
            <TabBar tabs={tabs} activeTabId={activeTabId} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
            <div className={`flex-grow overflow-y-auto text-gray-200 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 ${isMobile ? 'p-2' : 'p-6'}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.3
                        }}
                        className="min-h-[400px]"
                    >
                        {activeTabData ? (
                            <div className="min-h-[400px]">
                                {activeTabData.content}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 min-h-[400px] flex items-center justify-center">
                                <div>
                                    <div className="text-2xl font-bold mb-2">Welcome to My Portfolio</div>
                                    <div className="text-sm">Select an application to begin exploring</div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );

    if (isMobile) {
        // On mobile, always maximized and not draggable
        return windowContent;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="pointer-events-auto">
                {windowContent}
            </div>
        </div>
    );
};