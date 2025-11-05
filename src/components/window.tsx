import * as React from 'react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import Monicon from '@monicon/react';
import AspectRatioMinimize from './icons/aspect-ratio-fill-minimize';
import '../styles/window-animations.css';

interface WindowProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    className?: string;
    isActive?: boolean;
    onFocus?: () => void;
    isMinimized?: boolean;
    windowId?: string;
}

type WindowState = {
    x: number;
    y: number;
    width: number;
    height: number;
    isMaximized: boolean;
};

export default function Window({
    title,
    children,
    onClose,
    onMinimize,
    onMaximize,
    className = '',
    isActive = false,
    onFocus,
    isMinimized = false,
    windowId,
}: WindowProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    // Detect mobile viewport
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load saved state from localStorage or use defaults
    const loadWindowState = React.useCallback((): WindowState => {
        if (!windowId) {
            return { x: 32, y: 80, width: 800, height: 600, isMaximized: false };
        }

        try {
            const saved = localStorage.getItem(`window-state-${windowId}`);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load window state:', e);
        }

        return { x: 32, y: 80, width: 800, height: 600, isMaximized: false };
    }, [windowId]);

    const initialState = loadWindowState();
    const [position, setPosition] = React.useState({ x: initialState.x, y: initialState.y });
    const [size, setSize] = React.useState({ width: initialState.width, height: initialState.height });
    const [isMaximized, setIsMaximized] = React.useState(initialState.isMaximized);
    const [preMaximizeState, setPreMaximizeState] = React.useState({ x: initialState.x, y: initialState.y, width: initialState.width, height: initialState.height });
    const windowRef = React.useRef<HTMLDivElement>(null);

    // Use refs to track drag state without causing re-renders
    const isDraggingRef = React.useRef(false);
    const isResizingRef = React.useRef(false);
    const resizeDirectionRef = React.useRef('');
    const dragOffsetRef = React.useRef({ x: 0, y: 0 });
    const initialSizeRef = React.useRef({ width: 0, height: 0 });
    const initialPositionRef = React.useRef({ x: 0, y: 0 });
    const dragStartPosRef = React.useRef({ x: 0, y: 0 });

    // Save window state to localStorage
    const saveWindowState = React.useCallback(() => {
        if (!windowId) return;

        try {
            const state: WindowState = {
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height,
                isMaximized,
            };
            localStorage.setItem(`window-state-${windowId}`, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save window state:', e);
        }
    }, [windowId, position, size, isMaximized]);

    // Save state when window closes
    React.useEffect(() => {
        return () => {
            saveWindowState();
        };
    }, [saveWindowState]);

    // Save state periodically when position/size changes
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            saveWindowState();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [position, size, isMaximized, saveWindowState]);

    const handleMaximize = () => {
        if (isMaximized) {
            // Restore to previous state
            setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
            setSize({ width: preMaximizeState.width, height: preMaximizeState.height });
            setIsMaximized(false);
            // Notify dock to fade in
            window.dispatchEvent(new CustomEvent('windowMaximized', { detail: { isMaximized: false } }));
        } else {
            // Save current state
            setPreMaximizeState({ x: position.x, y: position.y, width: size.width, height: size.height });
            // Maximize with margins (8px on all sides)
            const margin = 8;
            setPosition({ x: margin, y: margin });
            setSize({
                width: window.innerWidth - (margin * 2),
                height: window.innerHeight - (margin * 2)
            });
            setIsMaximized(true);
            // Notify dock to fade out
            window.dispatchEvent(new CustomEvent('windowMaximized', { detail: { isMaximized: true } }));
        }
        onMaximize?.();
    };

    const handleMinimize = () => {
        if (windowRef.current) {
            // Add genie effect animation
            windowRef.current.style.animation = 'genie-minimize 0.5s ease-in-out forwards';
            setTimeout(() => {
                onMinimize?.();
            }, 500);
        } else {
            onMinimize?.();
        }
    };

    const handleMouseDown = (e: React.MouseEvent, type: 'drag' | 'resize', direction?: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (windowRef.current) {
            // Disable transitions during drag/resize for instant feedback
            windowRef.current.style.transition = 'none';
        }

        if (type === 'drag') {
            isDraggingRef.current = true;
            // Store the offset between mouse and window position
            dragOffsetRef.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        } else if (type === 'resize' && direction) {
            isResizingRef.current = true;
            resizeDirectionRef.current = direction;
            dragStartPosRef.current = { x: e.clientX, y: e.clientY };
            initialSizeRef.current = { ...size };
            initialPositionRef.current = { ...position };
        }
    };

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingRef.current && windowRef.current && !isMaximized) {
                // Calculate new position directly from mouse position
                let newX = e.clientX - dragOffsetRef.current.x;
                let newY = e.clientY - dragOffsetRef.current.y;

                // Constrain to viewport boundaries (only when not maximized)
                // Status bar is approximately 60px from top (16px padding + 28px height + 16px padding)
                const minY = 60;
                const minX = 0;
                const maxX = window.innerWidth - 100; // Keep at least 100px visible
                const maxY = window.innerHeight - 50; // Keep at least 50px visible

                newX = Math.max(minX, Math.min(newX, maxX));
                newY = Math.max(minY, Math.min(newY, maxY));

                // Apply directly to DOM synchronously for instant feedback
                windowRef.current.style.left = `${newX}px`;
                windowRef.current.style.top = `${newY}px`;
            } else if (isResizingRef.current && windowRef.current) {
                const deltaX = e.clientX - dragStartPosRef.current.x;
                const deltaY = e.clientY - dragStartPosRef.current.y;

                let newWidth = initialSizeRef.current.width;
                let newHeight = initialSizeRef.current.height;
                let newX = initialPositionRef.current.x;
                let newY = initialPositionRef.current.y;

                if (resizeDirectionRef.current.includes('e')) {
                    newWidth = Math.max(400, initialSizeRef.current.width + deltaX);
                }
                if (resizeDirectionRef.current.includes('w')) {
                    const widthDelta = Math.min(deltaX, initialSizeRef.current.width - 400);
                    newWidth = Math.max(400, initialSizeRef.current.width - widthDelta);
                    newX = initialPositionRef.current.x + widthDelta;
                }
                if (resizeDirectionRef.current.includes('s')) {
                    newHeight = Math.max(300, initialSizeRef.current.height + deltaY);
                }
                if (resizeDirectionRef.current.includes('n')) {
                    const heightDelta = Math.min(deltaY, initialSizeRef.current.height - 300);
                    newHeight = Math.max(300, initialSizeRef.current.height - heightDelta);
                    newY = initialPositionRef.current.y + heightDelta;
                }

                windowRef.current.style.width = `${newWidth}px`;
                windowRef.current.style.height = `${newHeight}px`;
                windowRef.current.style.left = `${newX}px`;
                windowRef.current.style.top = `${newY}px`;
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (isDraggingRef.current && windowRef.current) {
                // Re-enable transitions
                windowRef.current.style.transition = '';

                // Commit the final position to state with constraints (only when not maximized)
                let newX = e.clientX - dragOffsetRef.current.x;
                let newY = e.clientY - dragOffsetRef.current.y;

                if (!isMaximized) {
                    // Apply same constraints as during drag
                    const minY = 60;
                    const minX = 0;
                    const maxX = window.innerWidth - 100;
                    const maxY = window.innerHeight - 50;

                    newX = Math.max(minX, Math.min(newX, maxX));
                    newY = Math.max(minY, Math.min(newY, maxY));
                }

                setPosition({ x: newX, y: newY });
            } else if (isResizingRef.current && windowRef.current) {
                // Re-enable transitions
                windowRef.current.style.transition = '';

                // Commit the final size and position to state
                const rect = windowRef.current.getBoundingClientRect();
                setSize({ width: rect.width, height: rect.height });
                setPosition({ x: rect.left, y: rect.top });
            }

            isDraggingRef.current = false;
            isResizingRef.current = false;
            resizeDirectionRef.current = '';
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [position, size]);

    if (isMinimized) {
        return null;
    }

    return (
        <div
            ref={windowRef}
            onClick={onFocus}
            data-maximized={isMaximized}
            className={`fixed flex flex-col backdrop-blur-xl bg-gradient-to-br from-bg-1/95 via-bg-1/90 to-bg-1/85 shadow-[0_20px_60px_0_rgba(0,0,0,0.5)] md:rounded-2xl ${isActive ? 'border-2 border-blue z-40' : 'border border-white/10 z-30'} ${className}`}
            style={
                isMobile
                    ? {
                        left: 0,
                        top: '40px',
                        width: '100%',
                        height: 'calc(100vh - 40px - 96px)',
                        willChange: 'transform',
                        transition: 'border-color 200ms, border-width 200ms, z-index 200ms',
                    }
                    : {
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                        willChange: 'transform',
                        transition: isMaximized
                            ? 'all 300ms ease-in-out'
                            : 'border-color 200ms, border-width 200ms, z-index 200ms',
                    }
            }
        >
            {/* Resize Handles - Only on desktop */}
            {!isMobile && (
                <>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 's')}
                    />
                    <div
                        className="absolute top-0 bottom-0 left-0 w-2 cursor-w-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'w')}
                    />
                    <div
                        className="absolute top-0 bottom-0 right-0 w-2 cursor-e-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'e')}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'sw')}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'se')}
                    />
                    <div
                        className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'nw')}
                    />
                    <div
                        className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50"
                        onMouseDown={(e) => handleMouseDown(e, 'resize', 'ne')}
                    />
                </>
            )}

            {/* Window Header */}
            <div
                className={`flex items-center justify-between px-4 py-3 border-b border-white/10 ${!isMobile ? 'cursor-move' : ''}`}
                onMouseDown={(e) => !isMobile && handleMouseDown(e, 'drag')}
            >
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="w-3.5 h-3.5 rounded-full bg-red/80 hover:bg-red transition-all flex items-center justify-center group relative z-50"
                        aria-label="Close"
                    >
                        <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity">
                            <Monicon name="mingcute:close-fill" size={10} />
                        </span>
                    </button>
                    {onMinimize && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMinimize();
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-yellow/80 hover:bg-yellow transition-all flex items-center justify-center group relative z-50"
                            aria-label="Minimize"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity">
                                <Monicon name="mingcute:minimize-fill" size={10} />
                            </span>
                        </button>
                    )}
                    {onMaximize && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMaximize();
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-green/80 hover:bg-green transition-all flex items-center justify-center group relative z-50"
                            aria-label="Maximize"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity">
                                {isMaximized ? <AspectRatioMinimize /> : <Monicon name="mingcute:aspect-ratio-fill" size={10} />}
                            </span>
                        </button>
                    )}
                </div>
                <h2 className="text-sm font-medium text-foreground">{title}</h2>
                <div className="w-16" />
            </div>

            {/* Window Content with ScrollArea */}
            <ScrollArea.Root className="flex-1 flex flex-col min-h-0">
                <ScrollArea.Viewport className="flex-1 overscroll-contain relative">
                    <div className="absolute inset-0 p-6 flex flex-col">{children}</div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="m-2 flex w-1 justify-center rounded bg-white/10 opacity-0 transition-opacity delay-300 pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 data-[scrolling]:pointer-events-auto">
                    <ScrollArea.Thumb className="w-full rounded bg-foreground/50" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
}
