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
const FULL_CHARGE_CYCLE_MS = 52.5 * 60 * 1000; // 52.5 minutes in milliseconds
const BATTERY_STATES = [
    { icon: 'mingcute:battery-1-line', threshold: 0, isCharging: true },      // 0-20%: Charging
    { icon: 'mingcute:battery-1-line', threshold: 0.2, isCharging: false },   // 20-40%
    { icon: 'mingcute:battery-2-line', threshold: 0.4, isCharging: false },   // 40-60%
    { icon: 'mingcute:battery-3-line', threshold: 0.6, isCharging: false },   // 60-80%
    { icon: 'mingcute:battery-4-line', threshold: 0.8, isCharging: false },   // 80-95%
    { icon: 'mingcute:battery-fill', threshold: 0.95, isCharging: false },    // 95-100%
];

const getBatteryState = () => {
    const now = Date.now();
    let startTime = localStorage.getItem('battery-start-time');
    
    if (!startTime) {
        // First visit, initialize the battery cycle
        localStorage.setItem('battery-start-time', now.toString());
        startTime = now.toString();
    }
    
    const elapsed = now - parseInt(startTime);
    const cyclePosition = (elapsed % FULL_CHARGE_CYCLE_MS) / FULL_CHARGE_CYCLE_MS;
    
    // Find the appropriate battery icon based on cycle position
    for (let i = BATTERY_STATES.length - 1; i >= 0; i--) {
        if (cyclePosition >= BATTERY_STATES[i].threshold) {
            return {
                icon: BATTERY_STATES[i].icon,
                percentage: Math.round(cyclePosition * 100),
                isCharging: BATTERY_STATES[i].isCharging,
            };
        }
    }
    
    return { icon: BATTERY_STATES[0].icon, percentage: 0, isCharging: true };
};

export default function StatusBar({ windows, activeWindowId, minimizedWindowIds, onWindowSelect }: StatusBarProps) {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [batteryState, setBatteryState] = React.useState(getBatteryState());
    const [showBatteryTooltip, setShowBatteryTooltip] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const batteryRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            const newBatteryState = getBatteryState();
            console.log('Battery:', newBatteryState.percentage + '%', 'Charging:', newBatteryState.isCharging);
            setBatteryState(newBatteryState);
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
                <Monicon name="mingcute:wifi-fill" size={14} color="#A7C080" />
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
                <span className="text-xs font-sans">
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
        </div>
    );
}
