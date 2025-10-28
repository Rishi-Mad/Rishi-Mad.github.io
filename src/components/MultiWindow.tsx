import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface MultiWindowProps {
    id: string;
    title: string;
    content: React.ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    onPositionChange: (position: { x: number; y: number }) => void;
    onSizeChange: (size: { width: number; height: number }) => void;
}

export const MultiWindow: React.FC<MultiWindowProps> = ({
    id,
    title,
    content,
    isMinimized,
    isMaximized,
    position,
    size,
    zIndex,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onPositionChange,
    onSizeChange
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    if (isMinimized) {
        return null;
    }

    const windowStyle = isMaximized
        ? {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: 'calc(100vh - 3rem)',
            zIndex
        }
        : {
            position: 'absolute' as const,
            zIndex
        };

    const windowContent = (
        <div
            ref={nodeRef}
            style={windowStyle}
            className={`flex flex-col glass-dark rounded-lg shadow-2xl border border-blue-500/20 ${isMaximized ? '' : 'neon-glow'}`}
            onMouseDown={onFocus}
        >
            <div
                className="flex items-center justify-between p-3 glass-light rounded-t-lg border-b border-gray-700/20 flex-shrink-0 cursor-move"
                id={`window-drag-handle-${id}`}
            >
                <div className="flex items-center space-x-2">
                    <motion.button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Close window"
                    >
                        <X className="w-2 h-2 text-black/50" />
                    </motion.button>
                    <motion.button
                        onClick={onMinimize}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Minimize window"
                    >
                        <Minus className="w-2 h-2 text-black/50" />
                    </motion.button>
                    <motion.button
                        onClick={onMaximize}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Maximize window"
                    >
                        {isMaximized ? (
                            <Minimize2 className="w-2 h-2 text-black/50" />
                        ) : (
                            <Maximize2 className="w-2 h-2 text-black/50" />
                        )}
                    </motion.button>
                </div>
                <span className="font-semibold text-sm text-white truncate px-4">{title}</span>
                <div className="w-20"></div>
            </div>
            <div className="flex-grow overflow-y-auto text-gray-200 p-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
                {content}
            </div>
        </div>
    );

    if (isMaximized) {
        return <div ref={nodeRef}>{windowContent}</div>;
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            handle={`#window-drag-handle-${id}`}
            position={position}
            onDrag={(e, data) => onPositionChange({ x: data.x, y: data.y })}
            bounds="parent"
        >
            <div style={{ position: 'absolute' }}>
                <Resizable
                    width={size.width}
                    height={size.height}
                    onResize={(e, { size: newSize }) => {
                        onSizeChange({ width: newSize.width, height: newSize.height });
                    }}
                    minConstraints={[400, 300]}
                    maxConstraints={[1400, 1000]}
                >
                    <div style={{ width: size.width, height: size.height }}>
                        {windowContent}
                    </div>
                </Resizable>
            </div>
        </Draggable>
    );
};
