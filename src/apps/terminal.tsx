import * as React from 'react';
import '../styles/terminal.css';

type HistoryEntry = {
    command: string;
    output: React.ReactNode;
};

const COMMANDS = {
    whoami: () => (
        <div className="space-y-1">
            <p className="text-foreground">Guest User</p>
            <p className="text-gray-1 text-sm">Role: Visitor</p>
        </div>
    ),
    fetch: () => (
        <div className="space-y-2">
            <div className="flex gap-8">
                <div className="text-aqua font-bold">
                    <pre className="text-xs leading-tight">{`
    ___
   /   \\
  |  o  |
   \\___/
    | |
   /   \\
                    `.trim()}</pre>
                </div>
                <div className="space-y-1 text-sm">
                    <p><span className="text-blue">OS:</span> <span className="text-foreground">Web Portfolio</span></p>
                    <p><span className="text-blue">Shell:</span> <span className="text-foreground">terminal.tsx</span></p>
                    <p><span className="text-blue">Theme:</span> <span className="text-foreground">Everforest Dark</span></p>
                    <p><span className="text-blue">Font:</span> <span className="text-foreground">Hack Nerd Font</span></p>
                    <p><span className="text-blue">Framework:</span> <span className="text-foreground">React + Vite</span></p>
                </div>
            </div>
        </div>
    ),
    logs: () => (
        <div className="space-y-1 text-sm">
            <p className="text-gray-1">[{new Date().toLocaleTimeString()}] <span className="text-green">INFO</span> Terminal initialized</p>
            <p className="text-gray-1">[{new Date().toLocaleTimeString()}] <span className="text-blue">DEBUG</span> Loading Everforest theme</p>
            <p className="text-gray-1">[{new Date().toLocaleTimeString()}] <span className="text-green">INFO</span> All systems operational</p>
            <p className="text-gray-1">[{new Date().toLocaleTimeString()}] <span className="text-aqua">SUCCESS</span> Ready for commands</p>
        </div>
    ),
    skills: () => (
        <div className="space-y-2">
            <p className="text-yellow font-semibold">Technical Skills:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <p className="text-green">Frontend:</p>
                    <p className="text-foreground ml-4">• React / TypeScript</p>
                    <p className="text-foreground ml-4">• Tailwind CSS</p>
                    <p className="text-foreground ml-4">• Vite</p>
                </div>
                <div>
                    <p className="text-blue">Tools:</p>
                    <p className="text-foreground ml-4">• Git / GitHub</p>
                    <p className="text-foreground ml-4">• VS Code</p>
                    <p className="text-foreground ml-4">• Terminal</p>
                </div>
            </div>
        </div>
    ),
    help: () => (
        <div className="space-y-2">
            <p className="text-yellow">Available commands:</p>
            <div className="space-y-1 text-sm ml-4">
                <p><span className="text-green">whoami</span> <span className="text-gray-1">- Display user information</span></p>
                <p><span className="text-green">fetch</span> <span className="text-gray-1">- Show system information</span></p>
                <p><span className="text-green">logs</span> <span className="text-gray-1">- Display recent system logs</span></p>
                <p><span className="text-green">skills</span> <span className="text-gray-1">- List technical skills</span></p>
                <p><span className="text-green">help</span> <span className="text-gray-1">- Show this help message</span></p>
                <p><span className="text-green">clear</span> <span className="text-gray-1">- Clear terminal history</span></p>
            </div>
        </div>
    ),
};

export default function TerminalApp() {
    const [history, setHistory] = React.useState<HistoryEntry[]>([
        {
            command: 'welcome',
            output: (
                <div className="space-y-2">
                    <p className="text-aqua">Welcome to the Terminal!</p>
                    <p className="text-gray-1 text-sm">Type <span className="text-green">help</span> to see available commands.</p>
                </div>
            ),
        },
    ]);
    const [input, setInput] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        let output: React.ReactNode;

        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        if (cmd in COMMANDS) {
            output = COMMANDS[cmd as keyof typeof COMMANDS]();
        } else {
            output = (
                <p className="text-red">
                    Command not found: {cmd}. Type <span className="text-green">help</span> for available commands.
                </p>
            );
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
        setInput('');
    };

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="flex flex-col font-mono text-sm overflow-hidden rounded-b-2xl -m-6 flex-1 min-h-0"
            style={{
                backgroundColor: 'var(--color-bg-dim)',
            }}
            onClick={handleTerminalClick}
        >
            <div
                className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                {history.map((entry, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-green">➜</span>
                            <span className="text-blue">~</span>
                            <span className="text-foreground">{entry.command}</span>
                        </div>
                        <div className="ml-6">{entry.output}</div>
                    </div>
                ))}
                
                <form onSubmit={handleSubmit} className="pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-green">➜</span>
                        <span className="text-blue">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-foreground"
                            style={{ caretColor: 'var(--color-green)' }}
                            autoFocus
                            spellCheck={false}
                        />
                    </div>
                </form>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
