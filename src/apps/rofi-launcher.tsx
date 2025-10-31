import * as React from 'react';
import { Command } from 'cmdk';
import '../styles/command-palette.css';

interface RofiLauncherAppProps {
    onOpenApp: (id: string, title: string) => void;
    onClose: () => void;
}

export default function RofiLauncherApp({ onOpenApp, onClose }: RofiLauncherAppProps) {
    const [open, setOpen] = React.useState(true);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            onClose();
        }
    };

    const handleSelect = (callback: () => void) => {
        callback();
        handleOpenChange(false);
    };

    return (
        <Command.Dialog open={open} onOpenChange={handleOpenChange} label="Global Command Menu">
            <Command.Input placeholder="Search for apps..." />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                <Command.Group heading="Applications">
                    <Command.Item onSelect={() => handleSelect(() => onOpenApp('profile', 'Profile'))}>
                        Profile
                    </Command.Item>
                    <Command.Item onSelect={() => handleSelect(() => onOpenApp('terminal', 'Terminal'))}>
                        Terminal
                    </Command.Item>
                    <Command.Item onSelect={() => handleSelect(() => onOpenApp('settings', 'Settings'))}>
                        Settings
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    );
}
