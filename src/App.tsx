import * as React from 'react';
import StatusBar from './components/status-bar';
import Dock from './components/dock';
import CommandPaletteApp from './apps/command-palette';
import sunsetWallpaper from './assets/sunset.png';
import './styles/window-animations.css';

type AppWindow = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function App() {
  const [windows, setWindows] = React.useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = React.useState<string | null>(null);
  const [minimizedWindowIds, setMinimizedWindowIds] = React.useState<Set<string>>(new Set());
  const [showCommandPalette, setShowCommandPalette] = React.useState(false);

  const handleWindowsChange = React.useCallback(
    (newWindows: AppWindow[], newActiveId: string | null, minimizedIds: Set<string>) => {
      setWindows(newWindows);
      setActiveWindowId(newActiveId);
      setMinimizedWindowIds(minimizedIds);
    },
    [],
  );

  const handleWindowSelect = React.useCallback((id: string) => {
    setActiveWindowId(id);
    // Trigger focus on the window through the dock
    const event = new CustomEvent('focusWindow', { detail: { id } });
    window.dispatchEvent(event);
  }, []);

  const handleOpenCommandPalette = React.useCallback(() => {
    setShowCommandPalette(true);
  }, []);

  const handleOpenApp = React.useCallback((id: string, title: string) => {
    // Trigger window open through dock
    const event = new CustomEvent('openWindowFromApp', { detail: { id, title } });
    window.dispatchEvent(event);
    setShowCommandPalette(false);
  }, []);

  return (
    <div
      className="min-h-screen text-foreground bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${sunsetWallpaper})` }}
    >
      <Dock
        onWindowsChange={handleWindowsChange}
        onOpenCommandPalette={handleOpenCommandPalette}
      />

      <header className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-center transition-all duration-300 status-bar-header">
        <StatusBar
          windows={windows}
          activeWindowId={activeWindowId}
          minimizedWindowIds={minimizedWindowIds}
          onWindowSelect={handleWindowSelect}
        />
      </header>

      <main className="pt-24 px-4"></main>

      {/* Command Palette - Dialog handles its own portal and z-index */}
      {showCommandPalette && (
        <CommandPaletteApp
          onOpenApp={handleOpenApp}
          onClose={() => setShowCommandPalette(false)}
        />
      )}
    </div>
  );
}

export default App;
