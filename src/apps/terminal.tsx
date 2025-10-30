export default function TerminalApp() {
    return (
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-bg-dim font-mono text-sm">
                <p className="text-green">$ npm run dev</p>
                <p className="text-foreground/70 mt-2">VITE v7.1.7 ready in 234 ms</p>
                <p className="text-blue mt-1">➜ Local: http://localhost:5173/</p>
                <p className="text-foreground/70 mt-1">➜ Network: use --host to expose</p>
                <p className="text-foreground/70 mt-2">➜ press h + enter to show help</p>
            </div>
        </div>
    );
}
