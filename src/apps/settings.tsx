import * as React from 'react';
import Monicon from '@monicon/react';

// Import wallpapers
import minasTirithWallpaper from '../assets/minas-tirith.png';
import sunsetWallpaper from '../assets/sunset.png';
import solarPulseWallpaper from '../assets/solar-pulse.jpg';
import uagamiCherryBlossomsWallpaper from '../assets/uagami-cherry-blossoms.jpg';
import animatedBlossomWallpaper from '../assets/animated_blossom.gif';
import animatedSkyWallpaper from '../assets/animated_sky.gif';
import deloreanNightSkyWallpaper from '../assets/delorean_night_sky.gif';

type Wallpaper = {
    id: string;
    name: string;
    url: string;
    category: 'still' | 'animated';
};

const wallpapers: Wallpaper[] = [
    // Still wallpapers
    { id: 'minas-tirith', name: 'Minas Tirith', url: minasTirithWallpaper, category: 'still' },
    { id: 'sunset', name: 'Sunset', url: sunsetWallpaper, category: 'still' },
    { id: 'solar-pulse', name: 'Solar Pulse', url: solarPulseWallpaper, category: 'still' },
    { id: 'uagami-cherry-blossoms', name: 'Cherry Blossoms', url: uagamiCherryBlossomsWallpaper, category: 'still' },
    // Animated wallpapers
    { id: 'animated-blossom', name: 'Animated Blossom', url: animatedBlossomWallpaper, category: 'animated' },
    { id: 'animated-sky', name: 'Animated Sky', url: animatedSkyWallpaper, category: 'animated' },
    { id: 'delorean-night-sky', name: 'DeLorean Night', url: deloreanNightSkyWallpaper, category: 'animated' },
];

export default function SettingsApp() {
    const [selectedCategory, setSelectedCategory] = React.useState<'still' | 'animated'>('still');
    const [currentWallpaper, setCurrentWallpaper] = React.useState<string>(() => {
        return localStorage.getItem('wallpaper') || 'minas-tirith';
    });

    const filteredWallpapers = wallpapers.filter(w => w.category === selectedCategory);

    const handleWallpaperChange = (wallpaperId: string) => {
        console.log('Changing wallpaper to:', wallpaperId);
        setCurrentWallpaper(wallpaperId);
        localStorage.setItem('wallpaper', wallpaperId);
        // Dispatch event to notify App.tsx
        const event = new CustomEvent('wallpaperChange', { detail: { wallpaperId } });
        window.dispatchEvent(event);
        console.log('Wallpaper change event dispatched');
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>

            {/* Wallpaper Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-blue flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue rounded-full" />
                    Wallpaper
                </h2>

                {/* Category Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedCategory('still')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === 'still'
                                ? 'bg-blue text-white'
                                : 'bg-bg-2/50 text-gray-1 hover:bg-bg-3/50'
                        }`}
                    >
                        Still
                    </button>
                    <button
                        onClick={() => setSelectedCategory('animated')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === 'animated'
                                ? 'bg-blue text-white'
                                : 'bg-bg-2/50 text-gray-1 hover:bg-bg-3/50'
                        }`}
                    >
                        Animated
                    </button>
                </div>

                {/* Wallpaper Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredWallpapers.map((wallpaper) => (
                        <button
                            key={wallpaper.id}
                            onClick={() => handleWallpaperChange(wallpaper.id)}
                            className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                                currentWallpaper === wallpaper.id
                                    ? 'border-blue shadow-lg shadow-blue/30'
                                    : 'border-white/10 hover:border-blue/50'
                            }`}
                        >
                            <img
                                src={wallpaper.url}
                                alt={wallpaper.name}
                                className="w-full h-full object-cover"
                            />
                            {currentWallpaper === wallpaper.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue rounded-full flex items-center justify-center">
                                    <Monicon name="mingcute:check-fill" size={16} color="white" />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-0/90 to-transparent p-2">
                                <p className="text-xs font-medium text-foreground">{wallpaper.name}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredWallpapers.length === 0 && (
                    <div className="text-center py-8 text-gray-1">
                        <p>No {selectedCategory} wallpapers available yet.</p>
                        <p className="text-xs mt-2">Add wallpaper images to the assets folder.</p>
                    </div>
                )}
            </section>

            {/* Other Settings Sections */}
            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-green flex items-center gap-2">
                    <span className="w-1 h-6 bg-green rounded-full" />
                    System
                </h2>
                <div className="p-4 rounded-xl bg-bg-2/50 border border-white/5 hover:border-green/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-gray-1 mt-1">Manage notification preferences</p>
                </div>
                <div className="p-4 rounded-xl bg-bg-2/50 border border-white/5 hover:border-green/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">Privacy</p>
                    <p className="text-xs text-gray-1 mt-1">Control your data and privacy</p>
                </div>
            </section>
        </div>
    );
}
