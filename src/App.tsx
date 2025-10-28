import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code, Briefcase, User, Mail, Settings, Terminal, Brain } from 'lucide-react';

// Component Imports
import { MultiWindow } from './components/MultiWindow';
import { Taskbar } from './components/Taskbar';
import { DesktopIcon } from './components/DesktopIcon';

// Hook Imports
import { useWindowManager } from './hooks/useWindowManager';

// Content Imports
import { AboutContent } from './content/AboutContent';
import { ProjectsContent } from './content/ProjectsContent';
import { ProjectDetailContent } from './content/ProjectDetailContent';
import { SkillsContent } from './content/SkillsContent';
import { ExperienceContent } from './content/ExperienceContent';
import { ContactContent } from './content/ContactContent';
import { TerminalContent } from './content/TerminalContent';
import { SettingsContent } from './content/SettingsContent';
import AIDemoContent from './content/AIDemoContent';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
];

interface IconData {
    id: string;
    label: string;
    icon: ReactNode;
    color: string;
}

const App: React.FC = () => {
    const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const {
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize
    } = useWindowManager();

    const [konamiIndex, setKonamiIndex] = useState<number>(0);
    const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);
    const [aiDemoUnlocked, setAiDemoUnlocked] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log('Key pressed:', e.key, 'Expected:', KONAMI_CODE[konamiIndex], 'Index:', konamiIndex);
            if (e.key === KONAMI_CODE[konamiIndex]) {
                if (konamiIndex + 1 === KONAMI_CODE.length) {
                    console.log('🎉 Konami code completed! Unlocking AI Demo...');
                    setShowEasterEgg(true);
                    setAiDemoUnlocked(true);
                    console.log('AI Demo unlocked state set to:', true);
                    setKonamiIndex(0);
                    setTimeout(() => setShowEasterEgg(false), 4000);
                } else {
                    console.log('Konami progress:', konamiIndex + 1, '/', KONAMI_CODE.length);
                    setKonamiIndex(konamiIndex + 1);
                }
            } else {
                setKonamiIndex(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiIndex]);

    const handleProjectClick = (project: any) => {
        openWindow(project.id, project.title, <ProjectDetailContent project={project} />);
    };

    const getContentForId = (id: string): { title: string; content: ReactNode } | null => {
        switch (id) {
            case 'About': return { title: 'About Me', content: <AboutContent /> };
            case 'Projects': return { title: 'Projects', content: <ProjectsContent onProjectClick={handleProjectClick} /> };
            case 'Skills': return { title: 'Skills', content: <SkillsContent /> };
            case 'Experience': return { title: 'Experience', content: <ExperienceContent /> };
            case 'AIDemo': return { title: 'AI Demo', content: <AIDemoContent /> };
            case 'Contact': return { title: 'Contact', content: <ContactContent /> };
            case 'Terminal': return { title: 'Terminal', content: <TerminalContent /> };
            case 'Settings': return { title: 'Settings', content: <SettingsContent theme={theme} setTheme={setTheme} /> };
            default: return null;
        }
    };

    const handleIconClick = (id: string) => {
        console.log('Icon clicked:', id);
        const windowData = getContentForId(id);
        console.log('Window data:', windowData);
        if (windowData) {
            console.log('Opening window with:', id, windowData.title);
            openWindow(id, windowData.title, windowData.content);
        }
    };

    const icons: IconData[] = [
        { id: 'About', label: 'About Me', icon: <User className="w-10 h-10" />, color: 'text-blue-400' },
        { id: 'Projects', label: 'Projects', icon: <Folder className="w-10 h-10" />, color: 'text-yellow-400' },
        { id: 'Skills', label: 'Skills', icon: <Code className="w-10 h-10" />, color: 'text-green-400' },
        { id: 'Experience', label: 'Experience', icon: <Briefcase className="w-10 h-10" />, color: 'text-purple-400' },
        { id: 'Contact', label: 'Contact', icon: <Mail className="w-10 h-10" />, color: 'text-red-400' },
        { id: 'Terminal', label: 'Terminal', icon: <Terminal className="w-10 h-10" />, color: 'text-gray-300' }
    ];

    return (
        <>
            {showEasterEgg && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                    <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white text-4xl font-extrabold px-12 py-8 rounded-3xl shadow-2xl border-4 border-white animate-pulse">
                        🎉 Konami Code Activated! 🎉
                    </div>
                </motion.div>
            )}
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-700 text-white px-4 py-2 rounded shadow-lg">Skip to main content</a>
            <div className={`h-screen w-full animated-bg font-sans flex flex-col relative ${theme}`}>
                {/* Taskbar at top */}
                <Taskbar
                    windows={windows}
                    onWindowClick={focusWindow}
                />

                <div className="flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Enhanced Floating Particles */}
                    <div className="particles">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${2 + Math.random() * 4}px`,
                                    height: `${2 + Math.random() * 4}px`,
                                    animationDelay: `${Math.random() * 8}s`,
                                    animationDuration: `${8 + Math.random() * 6}s`
                                }}
                            />
                        ))}
                    </div>
                    <main id="main-content" className="h-full w-full relative z-10 flex items-center justify-center">
                        {/* Main Desktop Icons - Left Column */}
                        <nav className="absolute top-2 left-2 p-2 sm:p-4 grid grid-cols-1 gap-2 sm:gap-3 w-fit z-20" aria-label="Desktop icons">
                            {icons.slice(0, 6).map((icon, index) => (
                                <motion.div key={icon.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                    <DesktopIcon label={icon.label} icon={icon.icon} color={icon.color} onClick={() => handleIconClick(icon.id)} />
                                </motion.div>
                            ))}
                        </nav>

                        {/* Settings & AI Demo - Right Column */}
                        <nav className="absolute top-2 right-2 p-2 sm:p-4 grid grid-cols-1 gap-2 sm:gap-3 w-fit z-20" aria-label="Settings and AI icons">
                            {/* Settings Icon */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                <DesktopIcon
                                    label="Settings"
                                    icon={<Settings className="w-10 h-10" />}
                                    color="text-indigo-400"
                                    onClick={() => handleIconClick('Settings')}
                                />
                            </motion.div>

                            {/* Secret AI Demo Icon */}
                            <AnimatePresence>
                                {aiDemoUnlocked && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="relative"
                                    >
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                                        <DesktopIcon
                                            label="AI Demo"
                                            icon={<Brain className="w-10 h-10" />}
                                            color="text-pink-400"
                                            onClick={() => {
                                                console.log('AI Demo icon clicked!');
                                                handleIconClick('AIDemo');
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Konami progress indicator */}
                            {konamiIndex > 0 && (
                                <div className="text-white text-xs bg-blue-500/20 p-2 rounded">
                                    Konami: {konamiIndex}/{KONAMI_CODE.length}
                                </div>
                            )}
                        </nav>
                        {/* Debug: Show window count */}
                        {Object.keys(windows).length > 0 && (
                            <div className="fixed top-20 left-4 bg-red-500 text-white p-2 rounded z-50">
                                Windows open: {Object.keys(windows).length}
                            </div>
                        )}
                        
                        {/* Windows */}
                        {Object.values(windows).map((window) => {
                            console.log('Rendering window:', window.id, window);
                            return (
                                <MultiWindow
                                    key={window.id}
                                    id={window.id}
                                    title={window.title}
                                    content={window.content}
                                    isMinimized={window.isMinimized}
                                    isMaximized={window.isMaximized}
                                    position={window.position}
                                    size={window.size}
                                    zIndex={window.zIndex}
                                    onClose={() => closeWindow(window.id)}
                                    onMinimize={() => minimizeWindow(window.id)}
                                    onMaximize={() => maximizeWindow(window.id)}
                                    onFocus={() => focusWindow(window.id)}
                                    onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
                                    onSizeChange={(size) => updateWindowSize(window.id, size)}
                                />
                            );
                        })}
                    </main>
                </div>
            </div>
        </>
    );
};

export default App;
