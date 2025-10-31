import * as React from 'react';
import { createPortal } from 'react-dom';
import { Monicon } from '@monicon/react';

interface StatusBarProps {
    windows: Array<{ id: string; title: string }>;
    activeWindowId: string | null;
    minimizedWindowIds: Set<string>;
    onWindowSelect: (id: string) => void;
}

const japaneseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

// Battery charging cycle: 45 minutes to 1 hour (let's use 52.5 minutes = 3150000ms)
// Full cycle is charge (0-100%) then discharge (100-0%)
const FULL_CHARGE_CYCLE_MS = 52.5 * 60 * 1000; // 52.5 minutes in milliseconds
const HALF_CYCLE_MS = FULL_CHARGE_CYCLE_MS / 2; // 26.25 minutes for charge or discharge

const getBatteryState = () => {
    const now = Date.now();
    let startTime = localStorage.getItem('battery-start-time');
    
    if (!startTime) {
        // First visit, initialize the battery cycle
        localStorage.setItem('battery-start-time', now.toString());
        startTime = now.toString();
    }
    
    const elapsed = now - parseInt(startTime);
    const cyclePosition = elapsed % FULL_CHARGE_CYCLE_MS;
    
    // First half: charging (0% -> 100%)
    // Second half: discharging (100% -> 0%)
    const isCharging = cyclePosition < HALF_CYCLE_MS;
    const percentage = isCharging
        ? Math.round((cyclePosition / HALF_CYCLE_MS) * 100)
        : Math.round(((FULL_CHARGE_CYCLE_MS - cyclePosition) / HALF_CYCLE_MS) * 100);
    
    // Determine icon based on percentage
    let icon = 'mingcute:battery-1-line';
    if (percentage >= 95) {
        icon = 'mingcute:battery-fill';
    } else if (percentage >= 80) {
        icon = 'mingcute:battery-4-line';
    } else if (percentage >= 60) {
        icon = 'mingcute:battery-3-line';
    } else if (percentage >= 40) {
        icon = 'mingcute:battery-2-line';
    } else if (percentage >= 20) {
        icon = 'mingcute:battery-1-line';
    }
    
    return {
        icon,
        percentage,
        isCharging,
    };
};

export default function StatusBar({ windows, activeWindowId, minimizedWindowIds, onWindowSelect }: StatusBarProps) {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [batteryState, setBatteryState] = React.useState(getBatteryState());
    const [showBatteryTooltip, setShowBatteryTooltip] = React.useState(false);
    const [showWifiTooltip, setShowWifiTooltip] = React.useState(false);
    const [showTimeTooltip, setShowTimeTooltip] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const batteryRef = React.useRef<HTMLDivElement>(null);
    const wifiRef = React.useRef<HTMLDivElement>(null);
    const timeRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setBatteryState(getBatteryState());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleBatteryHover = (show: boolean) => {
        if (show && batteryRef.current) {
            const rect = batteryRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.bottom + 8,
            });
        }
        setShowBatteryTooltip(show);
    };

    const handleWifiHover = (show: boolean) => {
        if (show && wifiRef.current) {
            const rect = wifiRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.bottom + 8,
            });
        }
        setShowWifiTooltip(show);
    };

    const handleTimeHover = (show: boolean) => {
        if (show && timeRef.current) {
            const rect = timeRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.bottom + 8,
            });
        }
        setShowTimeTooltip(show);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="w-fit bg-bg-1 text-foreground h-7 rounded-md flex items-center px-3 gap-8">
            {/* Left side - Window indicators */}
            {windows.length > 0 && (
                <div className="flex items-center gap-1.5">
                    {windows.map((window, index) => {
                        const isMinimized = minimizedWindowIds.has(window.id);
                        const isActive = activeWindowId === window.id && !isMinimized;
                        return (
                            <button
                                key={window.id}
                                onClick={() => onWindowSelect(window.id)}
                                className={`text-sm font-sans transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer ${
                                    isActive ? 'text-blue' : isMinimized ? 'text-gray-0 opacity-50' : 'text-gray-1'
                                }`}
                                title={`${window.title}${isMinimized ? ' (minimized)' : ''}`}
                            >
                                {japaneseNumbers[index] || index + 1}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Right side - System indicators and time */}
            <div className="flex items-center gap-2">
                <div
                    ref={wifiRef}
                    className="cursor-default"
                    onMouseEnter={() => handleWifiHover(true)}
                    onMouseLeave={() => handleWifiHover(false)}
                >
                    <Monicon name="mingcute:wifi-fill" size={14} color="#A7C080" />
                </div>
                <div
                    ref={batteryRef}
                    className="cursor-default flex items-center"
                    onMouseEnter={() => handleBatteryHover(true)}
                    onMouseLeave={() => handleBatteryHover(false)}
                >
                    <Monicon name={batteryState.icon} size={16} color="#D3C6AA" />
                    {batteryState.isCharging && (
                        <Monicon name="mingcute:lightning-fill" size={8} color="#E5C890" />
                    )}
                </div>
                <span
                    ref={timeRef}
                    className="text-xs font-sans cursor-default"
                    onMouseEnter={() => handleTimeHover(true)}
                    onMouseLeave={() => handleTimeHover(false)}
                >
                    {formatDate(currentTime)} {formatTime(currentTime)}
                </span>
            </div>
            {showBatteryTooltip &&
                createPortal(
                    <div
                        className="fixed px-2 py-1 bg-bg-2 text-foreground text-xs rounded whitespace-nowrap pointer-events-none border border-bg-4"
                        style={{
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translateX(-50%)',
                            zIndex: 10000,
                        }}
                    >
                        {batteryState.percentage}%
                    </div>,
                    document.body,
                )}
            {showWifiTooltip &&
                createPortal(
                    <div
                        className="fixed px-2 py-1 bg-bg-2 text-foreground text-xs rounded whitespace-nowrap pointer-events-none border border-bg-4"
                        style={{
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translateX(-50%)',
                            zIndex: 10000,
                        }}
                    >
                        Status: Connected
                    </div>,
                    document.body,
                )}
            {showTimeTooltip &&
                createPortal(
                    <div
                        className="fixed px-2 py-1 bg-bg-2 text-foreground text-xs rounded whitespace-nowrap pointer-events-none border border-bg-4"
                        style={{
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translateX(-50%)',
                            zIndex: 10000,
                        }}
                    >
                        {currentTime.toLocaleString('en-US', {
                            timeZoneName: 'short',
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>,
                    document.body,
                )}
        </div>
    );
}
