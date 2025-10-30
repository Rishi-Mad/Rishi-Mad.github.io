import * as React from 'react';
import { Menubar } from '@base-ui-components/react/menubar';
import { Menu } from '@base-ui-components/react/menu';
import Monicon from '@monicon/react';
import Window from './window';
import ProfileApp from '../apps/profile';
import TerminalApp from '../apps/terminal';
import SettingsApp from '../apps/settings';
import CommandPaletteApp from '../apps/command-palette';

type AppWindow = {
    id: string;
    title: string;
    content: React.ReactNode;
};

interface DockProps {
    onWindowsChange?: (windows: AppWindow[], activeId: string | null, minimizedIds: Set<string>) => void;
}

export default function Dock({ onWindowsChange }: DockProps = {}) {
    const [openWindows, setOpenWindows] = React.useState<AppWindow[]>([]);
    const [activeWindowId, setActiveWindowId] = React.useState<string | null>(null);
    const [minimizedWindows, setMinimizedWindows] = React.useState<Set<string>>(new Set());
    const [showCommandPalette, setShowCommandPalette] = React.useState(false);

    React.useEffect(() => {
        onWindowsChange?.(openWindows, activeWindowId, minimizedWindows);
    }, [openWindows, activeWindowId, minimizedWindows, onWindowsChange]);

    const openWindow = (id: string, title: string, content: React.ReactNode) => {
        if (!openWindows.find((w) => w.id === id)) {
            setOpenWindows([...openWindows, { id, title, content }]);
            setActiveWindowId(id);
        } else {
            // Window exists, restore if minimized and focus
            if (minimizedWindows.has(id)) {
                const newMinimized = new Set(minimizedWindows);
                newMinimized.delete(id);
                setMinimizedWindows(newMinimized);
            }
            setActiveWindowId(id);
        }
    };

    const closeWindow = (id: string) => {
        setOpenWindows(openWindows.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(openWindows.length > 1 ? openWindows[0].id : null);
        }
    };

    const focusWindow = (id: string) => {
        setActiveWindowId(id);
        // Restore if minimized
        if (minimizedWindows.has(id)) {
            const newMinimized = new Set(minimizedWindows);
            newMinimized.delete(id);
            setMinimizedWindows(newMinimized);
        }
    };

    React.useEffect(() => {
        const handleFocusWindow = (event: CustomEvent) => {
            const { id } = event.detail;
            focusWindow(id);
        };

        window.addEventListener('focusWindow' as any, handleFocusWindow);
        return () => {
            window.removeEventListener('focusWindow' as any, handleFocusWindow);
        };
    }, []);

    return (
        <>
            <Menubar
                orientation="vertical"
                className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-2xl p-2 backdrop-blur-xl bg-gradient-to-br from-bg-1/40 via-bg-1/30 to-bg-1/20 border border-white/10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50 before:-z-10"
            >
                <Menu.Root>
                    <Menu.Trigger
                        onClick={() => openWindow('profile', 'Profile', <ProfileApp />)}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-red to-orange shadow-md"
                    >
                        <Monicon name="mingcute:profile-fill" size={28} color="white" />
                    </Menu.Trigger>
                </Menu.Root>

                <Menu.Root>
                    <Menu.Trigger
                        onClick={() => setShowCommandPalette(true)}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-blue to-aqua shadow-md"
                    >
                        <Monicon name="mingcute:dot-grid-fill" size={28} color="white" />
                    </Menu.Trigger>
                </Menu.Root>

                <Menu.Root>
                    <Menu.Trigger
                        onClick={() => openWindow('terminal', 'Terminal', <TerminalApp />)}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-green to-aqua shadow-md"
                    >
                        <Monicon name="mingcute:terminal-box-fill" size={28} color="white" />
                    </Menu.Trigger>
                </Menu.Root>

                <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

                <Menu.Root>
                    <Menu.Trigger
                        onClick={() => openWindow('settings', 'Settings', <SettingsApp />)}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary data-[popup-open]:scale-110 bg-gradient-to-br from-purple to-red shadow-md"
                    >
                        <Monicon name="mingcute:settings-3-fill" size={20} color="white" />
                    </Menu.Trigger>
                </Menu.Root>
            </Menubar>

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

            {/* Command Palette */}
            {showCommandPalette && (
                <CommandPaletteApp
                    onOpenApp={(id, title) => {
                        if (id === 'profile') openWindow(id, title, <ProfileApp />);
                        else if (id === 'terminal') openWindow(id, title, <TerminalApp />);
                        else if (id === 'settings') openWindow(id, title, <SettingsApp />);
                        setShowCommandPalette(false);
                    }}
                    onClose={() => setShowCommandPalette(false)}
                />
            )}
        </>
    );
}
