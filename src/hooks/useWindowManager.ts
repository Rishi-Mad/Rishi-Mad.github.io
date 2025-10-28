import { useState, useCallback } from 'react';

export interface WindowState {
    id: string;
    title: string;
    content: React.ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}

export const useWindowManager = () => {
    const [windows, setWindows] = useState<Record<string, WindowState>>({});
    const [highestZIndex, setHighestZIndex] = useState(100);

    const openWindow = useCallback((id: string, title: string, content: React.ReactNode) => {
        console.log('openWindow called with id:', id, 'title:', title);
        setHighestZIndex(prev => prev + 1);
        setWindows(prev => {
            if (prev[id]) {
                // Window already exists, just bring it to front and restore if minimized
                console.log('Window already exists, restoring:', id);
                return {
                    ...prev,
                    [id]: { ...prev[id], isMinimized: false, zIndex: highestZIndex + 1 }
                };
            }

            // Create new window with offset position
            const windowCount = Object.keys(prev).length;
            const offset = windowCount * 30;
            console.log('Creating new window:', id, 'at offset:', offset);

            return {
                ...prev,
                [id]: {
                    id,
                    title,
                    content,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 100 + offset, y: 50 + offset },
                    size: { width: 800, height: 600 },
                    zIndex: highestZIndex + 1
                }
            };
        });
    }, [highestZIndex]);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => {
            const newWindows = { ...prev };
            delete newWindows[id];
            return newWindows;
        });
    }, []);

    const minimizeWindow = useCallback((id: string) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true }
        }));
    }, []);

    const maximizeWindow = useCallback((id: string) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
        }));
    }, []);

    const focusWindow = useCallback((id: string) => {
        setHighestZIndex(prev => prev + 1);
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], zIndex: highestZIndex + 1, isMinimized: false }
        }));
    }, [highestZIndex]);

    const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], position }
        }));
    }, []);

    const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], size }
        }));
    }, []);

    return {
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize
    };
};
