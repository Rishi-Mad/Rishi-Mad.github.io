import * as React from 'react';
import { Monicon } from '@monicon/react';

interface StatusBarProps {
    windows: Array<{ id: string; title: string }>;
    activeWindowId: string | null;
    minimizedWindowIds: Set<string>;
    onWindowSelect: (id: string) => void;
}

const japaneseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export default function StatusBar({ windows, activeWindowId, minimizedWindowIds, onWindowSelect }: StatusBarProps) {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                <Monicon name="mingcute:wifi-fill" size={14} color="#D3C6AA" />
                <Monicon name="mingcute:battery-fill" size={14} color="#D3C6AA" />
                <span className="text-xs font-sans ml-1">
                    {formatDate(currentTime)} {formatTime(currentTime)}
                </span>
            </div>
        </div>
    );
}
