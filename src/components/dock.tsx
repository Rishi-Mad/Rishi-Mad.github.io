import * as React from 'react';
import { Menubar } from '@base-ui-components/react/menubar';
import { Menu } from '@base-ui-components/react/menu';
import { Tooltip } from '@base-ui-components/react/tooltip';
import Monicon from '@monicon/react';
import Window from './window';
import AppTooltip from './tooltip';
import ProfileApp from '../apps/profile';
import TerminalApp from '../apps/terminal';
import SettingsApp from '../apps/settings';
import ProjectsApp from '../apps/projects';

type AppWindow = {
    id: string;
    title: string;
    content: React.ReactNode;
};

interface DockProps {
    onWindowsChange?: (windows: AppWindow[], activeId: string | null, minimizedIds: Set<string>) => void;
    onOpenCommandPalette?: () => void;
}

export default function Dock({ onWindowsChange, onOpenCommandPalette }: DockProps = {}) {
    const [openWindows, setOpenWindows] = React.useState<AppWindow[]>([]);
    const [activeWindowId, setActiveWindowId] = React.useState<string | null>(null);
    const [minimizedWindows, setMinimizedWindows] = React.useState<Set<string>>(new Set());
    const [hasMaximizedWindow, setHasMaximizedWindow] = React.useState(false);

    React.useEffect(() => {
        onWindowsChange?.(openWindows, activeWindowId, minimizedWindows);
    }, [openWindows, activeWindowId, minimizedWindows, onWindowsChange]);

    const openWindow = React.useCallback((id: string, title: string, content: React.ReactNode) => {
        setOpenWindows((prevWindows) => {
            if (!prevWindows.find((w) => w.id === id)) {
                return [...prevWindows, { id, title, content }];
            }
            return prevWindows;
        });

        setMinimizedWindows((prevMinimized) => {
            if (prevMinimized.has(id)) {
                const newMinimized = new Set(prevMinimized);
                newMinimized.delete(id);
                return newMinimized;
            }
            return prevMinimized;
        });

        setActiveWindowId(id);
    }, []);

    const closeWindow = React.useCallback((id: string) => {
        setOpenWindows((prevWindows) => prevWindows.filter((w) => w.id !== id));
        setActiveWindowId((prevActiveId) => {
            if (prevActiveId === id) {
                return null;
            }
            return prevActiveId;
        });
    }, []);

    const focusWindow = React.useCallback((id: string) => {
        setActiveWindowId(id);
        // Restore if minimized
        setMinimizedWindows((prevMinimized) => {
            if (prevMinimized.has(id)) {
                const newMinimized = new Set(prevMinimized);
                newMinimized.delete(id);
                return newMinimized;
            }
            return prevMinimized;
        });
    }, []);

    React.useEffect(() => {
        const handleFocusWindow = (event: Event) => {
            const customEvent = event as CustomEvent<{ id: string }>;
            const { id } = customEvent.detail;
            focusWindow(id);
        };

        const handleWindowMaximized = (event: Event) => {
            const customEvent = event as CustomEvent<{ isMaximized: boolean }>;
            setHasMaximizedWindow(customEvent.detail.isMaximized);
        };

        const handleOpenWindowFromApp = (event: Event) => {
            const customEvent = event as CustomEvent<{ id: string; title: string }>;
            const { id, title } = customEvent.detail;
            if (id === 'profile') openWindow(id, title, <ProfileApp />);
            else if (id === 'terminal') openWindow(id, title, <TerminalApp />);
            else if (id === 'settings') openWindow(id, title, <SettingsApp />);
            else if (id === 'projects') openWindow(id, title, <ProjectsApp />);
        };

        window.addEventListener('focusWindow', handleFocusWindow);
        window.addEventListener('windowMaximized', handleWindowMaximized);
        window.addEventListener('openWindowFromApp', handleOpenWindowFromApp);
        return () => {
            window.removeEventListener('focusWindow', handleFocusWindow);
            window.removeEventListener('windowMaximized', handleWindowMaximized);
            window.removeEventListener('openWindowFromApp', handleOpenWindowFromApp);
        };
    }, [focusWindow, openWindow]);

    return (
        <>
            <Tooltip.Provider delay={300} closeDelay={0}>
                <Menubar
                    orientation="vertical"
                    className={`fixed left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-2xl p-2 backdrop-blur-xl bg-gradient-to-br from-bg-1/40 via-bg-1/30 to-bg-1/20 border border-white/10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50 before:-z-10 transition-opacity duration-300 ${
                        hasMaximizedWindow ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                >
                    <AppTooltip content="Profile" side="right">
                        <Menu.Root>
                            <Menu.Trigger
                                onClick={() => openWindow('profile', 'Profile', <ProfileApp />)}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-red to-orange shadow-md"
                            >
                                <Monicon name="mingcute:profile-fill" size={28} color="white" />
                            </Menu.Trigger>
                        </Menu.Root>
                    </AppTooltip>

                    <AppTooltip content="Rofi" side="right">
                        <Menu.Root>
                            <Menu.Trigger
                                onClick={() => onOpenCommandPalette?.()}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-blue to-aqua shadow-md"
                            >
                                <Monicon name="mingcute:dot-grid-fill" size={28} color="white" />
                            </Menu.Trigger>
                        </Menu.Root>
                    </AppTooltip>

                    <AppTooltip content="Terminal" side="right">
                        <Menu.Root>
                            <Menu.Trigger
                                onClick={() => openWindow('terminal', 'Terminal', <TerminalApp />)}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-green to-aqua shadow-md"
                            >
                                <Monicon name="mingcute:terminal-box-fill" size={28} color="white" />
                            </Menu.Trigger>
                        </Menu.Root>
                    </AppTooltip>

                    <AppTooltip content="Projects" side="right">
                        <Menu.Root>
                            <Menu.Trigger
                                onClick={() => openWindow('projects', 'Projects', <ProjectsApp />)}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-yellow to-orange shadow-md"
                            >
                                <Monicon name="mingcute:album-2-fill" size={28} color="white" />
                            </Menu.Trigger>
                        </Menu.Root>
                    </AppTooltip>

                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

                    <AppTooltip content="Settings" side="right">
                        <Menu.Root>
                            <Menu.Trigger
                                onClick={() => openWindow('settings', 'Settings', <SettingsApp />)}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-purple to-red shadow-md"
                            >
                                <Monicon name="mingcute:settings-3-fill" size={20} color="white" />
                            </Menu.Trigger>
                        </Menu.Root>
                    </AppTooltip>
                </Menubar>
            </Tooltip.Provider>

            {/* Render Open Windows */}
            {openWindows.map((window) => (
                <Window
                    key={window.id}
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                    onMinimize={() => {
                        setMinimizedWindows(new Set(minimizedWindows).add(window.id));
                    }}
                    onMaximize={() => {}}
                    isActive={activeWindowId === window.id}
                    onFocus={() => focusWindow(window.id)}
                    isMinimized={minimizedWindows.has(window.id)}
                >
                    {window.content}
                </Window>
            ))}
        </>
    );
}
