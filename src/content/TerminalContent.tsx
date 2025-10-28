import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Command {
    input: string;
    output: string;
}

export const TerminalContent: React.FC = () => {
    const [commands, setCommands] = useState<Command[]>([{ input: 'whoami', output: 'A passionate full-stack developer' }]);
    const [currentInput, setCurrentInput] = useState<string>('');
    
    const handleCommand = (cmd: string) => {
        let output = `Command not found: ${cmd}`;
        if (cmd === 'help') output = 'Available commands: whoami, skills, clear';
        if (cmd === 'skills') output = 'React, TypeScript, Python, AWS, Node.js';
        if (cmd === 'clear') { 
            setCommands([]); 
            return; 
        }
        setCommands(prev => [...prev, { input: cmd, output }]);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full bg-black/80 p-4 font-mono text-green-400 text-sm">
            <div>Welcome to the terminal. Type 'help' for commands.</div>
            {commands.map((cmd, index) => (
                <div key={index}>
                    <div className="text-blue-400">&gt; {cmd.input}</div>
                    <div>{cmd.output}</div>
                </div>
            ))}
            <div className="flex">
                <span className="text-blue-400">&gt;</span>
                <input 
                    type="text" 
                    value={currentInput} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentInput(e.target.value)} 
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { 
                        if (e.key === 'Enter') { 
                            handleCommand(currentInput); 
                            setCurrentInput(''); 
                        } 
                    }} 
                    className="flex-1 bg-transparent outline-none text-green-400 ml-1" 
                    autoFocus 
                />
            </div>
        </motion.div>
    );
};
