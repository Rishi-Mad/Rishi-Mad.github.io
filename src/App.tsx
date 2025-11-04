import * as React from 'react';
import StatusBar from './components/status-bar';
import Dock from './components/dock';
import RofiLauncherApp from './apps/rofi-launcher';
import minasTirithWallpaper from './assets/minas-tirith.png';
import sunsetWallpaper from './assets/sunset.png';
import solarPulseWallpaper from './assets/solar-pulse.jpg';
import uagamiCherryBlossomsWallpaper from './assets/uagami-cherry-blossoms.jpg';
import animatedBlossomWallpaper from './assets/animated_blossom.gif';
import animatedSkyWallpaper from './assets/animated_sky.gif';
import deloreanNightSkyWallpaper from './assets/delorean_night_sky.gif';
import './styles/window-animations.css';

type AppWindow = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const wallpaperMap: Record<string, string> = {
  'minas-tirith': minasTirithWallpaper,
  'sunset': sunsetWallpaper,
  'solar-pulse': solarPulseWallpaper,
  'uagami-cherry-blossoms': uagamiCherryBlossomsWallpaper,
  'animated-blossom': animatedBlossomWallpaper,
  'animated-sky': animatedSkyWallpaper,
  'delorean-night-sky': deloreanNightSkyWallpaper,
};

function App() {
  const [windows, setWindows] = React.useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = React.useState<string | null>(null);
  const [minimizedWindowIds, setMinimizedWindowIds] = React.useState<Set<string>>(new Set());
  const [showRofiLauncher, setShowRofiLauncher] = React.useState(false);
  const [currentWallpaper, setCurrentWallpaper] = React.useState<string>(() => {
    const saved = localStorage.getItem('wallpaper');
    return wallpaperMap[saved || 'minas-tirith'] || minasTirithWallpaper;
  });

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

  const handleOpenRofiLauncher = React.useCallback(() => {
    setShowRofiLauncher(true);
  }, []);

  const handleOpenApp = React.useCallback((id: string, title: string) => {
    // Trigger window open through dock
    const event = new CustomEvent('openWindowFromApp', { detail: { id, title } });
    window.dispatchEvent(event);
    setShowRofiLauncher(false);
  }, []);

  // Listen for wallpaper changes
  React.useEffect(() => {
    const handleWallpaperChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ wallpaperId: string }>;
      const { wallpaperId } = customEvent.detail;
      console.log('Received wallpaper change event:', wallpaperId);
      const newWallpaper = wallpaperMap[wallpaperId];
      console.log('New wallpaper URL:', newWallpaper);
      if (newWallpaper) {
        setCurrentWallpaper(newWallpaper);
      } else {
        console.error('Wallpaper not found in map:', wallpaperId);
      }
    };

    window.addEventListener('wallpaperChange', handleWallpaperChange);
    return () => window.removeEventListener('wallpaperChange', handleWallpaperChange);
  }, []);

  // Keyboard shortcuts: Cmd+K / Cmd+J (macOS) or Ctrl+K / Ctrl+J (Windows/Linux)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;
      const wrongModifier = isMac ? e.ctrlKey : e.metaKey;

      // Cmd/Ctrl + K for Rofi Launcher
      if (modifierKey && e.key === 'k' && !wrongModifier && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        setShowRofiLauncher((prev) => !prev);
      }

      // Cmd/Ctrl + J for Terminal (allows multiple instances)
      if (modifierKey && e.key === 'j' && !wrongModifier && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        const event = new CustomEvent('openWindowFromApp', {
          detail: { id: 'terminal', title: 'Terminal', allowMultiple: true },
        });
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="min-h-screen text-foreground bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      <Dock
        onWindowsChange={handleWindowsChange}
        onOpenRofiLauncher={handleOpenRofiLauncher}
      />

      <header className="fixed top-0 left-0 right-0 z-20 md:p-4 flex justify-center transition-all duration-300 status-bar-header">
        <StatusBar
          windows={windows}
          activeWindowId={activeWindowId}
          minimizedWindowIds={minimizedWindowIds}
          onWindowSelect={handleWindowSelect}
        />
      </header>

      <main className="pt-24 px-4"></main>

      {/* Rofi Launcher - Dialog handles its own portal and z-index */}
      {showRofiLauncher && (
        <RofiLauncherApp
          onOpenApp={handleOpenApp}
          onClose={() => setShowRofiLauncher(false)}
        />
      )}
    </div>
  );
}

export default App;
