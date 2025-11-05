import * as React from 'react';
import Monicon from '@monicon/react';

// Import wallpapers
import minasTirithWallpaper from '../assets/minas-tirith.png';
import sunsetWallpaper from '../assets/sunset.png';
import uagamiCherryBlossomsWallpaper from '../assets/uagami-cherry-blossoms.jpg';
import loneManWallpaper from '../assets/lone_man.gif';
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
    { id: 'uagami-cherry-blossoms', name: 'Cherry Blossoms', url: uagamiCherryBlossomsWallpaper, category: 'still' },
    // Animated wallpapers
    { id: 'lone-man', name: 'Lone Man', url: loneManWallpaper, category: 'animated' },
    { id: 'animated-sky', name: 'Animated Sky', url: animatedSkyWallpaper, category: 'animated' },
    { id: 'delorean-night-sky', name: 'DeLorean Night', url: deloreanNightSkyWallpaper, category: 'animated' },
];

export default function SettingsApp() {
    const [selectedCategory, setSelectedCategory] = React.useState<'still' | 'animated'>('still');
    const [currentWallpaper, setCurrentWallpaper] = React.useState<string>(() => {
        return localStorage.getItem('wallpaper') || 'minas-tirith';
    });
    const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(['wallpaper']));

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

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>

            {/* Wallpaper Section */}
            <section className="flex flex-col gap-4">
                <button
                    onClick={() => toggleSection('wallpaper')}
                    className="text-xl font-semibold text-blue flex items-center gap-2 hover:text-blue/80 transition-colors"
                >
                    <span className="w-1 h-6 bg-blue rounded-full" />
                    Wallpaper
                    <Monicon
                        name={expandedSections.has('wallpaper') ? 'mingcute:down-line' : 'mingcute:right-line'}
                        size={20}
                        color="#7fbbb3"
                    />
                </button>

                {expandedSections.has('wallpaper') && (
                    <>
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
                    </>
                )}
            </section>

            {/* About This Portfolio */}
            <section className="flex flex-col gap-4">
                <button
                    onClick={() => toggleSection('about')}
                    className="text-xl font-semibold text-yellow flex items-center gap-2 hover:text-yellow/80 transition-colors"
                >
                    <span className="w-1 h-6 bg-yellow rounded-full" />
                    About This Portfolio
                    <Monicon
                        name={expandedSections.has('about') ? 'mingcute:down-line' : 'mingcute:right-line'}
                        size={20}
                        color="#dbbc7f"
                    />
                </button>
                {expandedSections.has('about') && (
                    <div className="p-4 rounded-xl bg-bg-2/50 border border-white/5">
                        <p className="text-sm text-gray-1 leading-relaxed">
                            This portfolio is a culmination of a lot of time and effort, representing my journey in 
                            software engineering and my aspiration to continue learning and growing. I will continue to 
                            improve this portfolio and build more innovative and exciting projects going forward. Thank 
                            you for taking the time to explore my work!
                        </p>
                    </div>
                )}
            </section>

            {/* Contact Section */}
            <section className="flex flex-col gap-4">
                <button
                    onClick={() => toggleSection('contact')}
                    className="text-xl font-semibold text-green flex items-center gap-2 hover:text-green/80 transition-colors"
                >
                    <span className="w-1 h-6 bg-green rounded-full" />
                    Contact
                    <Monicon
                        name={expandedSections.has('contact') ? 'mingcute:down-line' : 'mingcute:right-line'}
                        size={20}
                        color="#a7c080"
                    />
                </button>
                {expandedSections.has('contact') && (
                    <div className="flex flex-col gap-3">
                    <a
                        href="mailto:rm08222006@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-bg-2/50 border border-white/5 hover:border-green/30 transition-colors flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red to-orange flex items-center justify-center">
                            <Monicon name="mingcute:mail-fill" size={20} color="white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground group-hover:text-green transition-colors">Email</p>
                            <p className="text-xs text-gray-1">rm08222006@gmail.com</p>
                        </div>
                        <Monicon name="mingcute:external-link-line" size={16} color="#859289" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/rishi-madipalli-123a89289/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-bg-2/50 border border-white/5 hover:border-green/30 transition-colors flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue to-aqua flex items-center justify-center">
                            <Monicon name="mingcute:linkedin-fill" size={20} color="white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground group-hover:text-green transition-colors">LinkedIn</p>
                            <p className="text-xs text-gray-1">Rishi Madipalli</p>
                        </div>
                        <Monicon name="mingcute:external-link-line" size={16} color="#859289" />
                    </a>

                    <a
                        href="https://github.com/Rishi-Mad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-bg-2/50 border border-white/5 hover:border-green/30 transition-colors flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple to-red flex items-center justify-center">
                            <Monicon name="mingcute:github-fill" size={20} color="white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground group-hover:text-green transition-colors">GitHub</p>
                            <p className="text-xs text-gray-1">@Rishi-Mad</p>
                        </div>
                        <Monicon name="mingcute:external-link-line" size={16} color="#859289" />
                    </a>
                    </div>
                )}
            </section>
        </div>
    );
}
