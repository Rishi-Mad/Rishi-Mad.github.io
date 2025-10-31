import * as React from 'react';

interface KeyboardProps {
    keys: string[];
    className?: string;
}

export default function Keyboard({ keys, className = '' }: KeyboardProps) {
    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            {keys.map((key, index) => (
                <React.Fragment key={index}>
                    <kbd
                        className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-mono rounded border"
                        style={{
                            backgroundColor: 'var(--color-bg-3)',
                            color: 'var(--color-foreground)',
                            borderColor: 'var(--color-bg-4)',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {key}
                    </kbd>
                    {index < keys.length - 1 && <span className="text-gray-1 text-xs">+</span>}
                </React.Fragment>
            ))}
        </span>
    );
}
