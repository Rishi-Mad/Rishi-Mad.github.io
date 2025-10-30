import * as React from 'react';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import 'react-cmdk/dist/cmdk.css';
import '../styles/command-palette.css';

interface CommandPaletteAppProps {
    onOpenApp: (id: string, title: string) => void;
    onClose: () => void;
}

export default function CommandPaletteApp({ onOpenApp, onClose }: CommandPaletteAppProps) {
    const [page] = React.useState<'root'>('root');
    const [search, setSearch] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClose = () => {
        setIsOpen(false);
        // Wait for transition to complete before calling onClose
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const filteredItems = filterItems(
        [
            {
                heading: 'Applications',
                id: 'apps',
                items: [
                    {
                        id: 'profile',
                        children: 'Profile',
                        onClick: () => onOpenApp('profile', 'Profile'),
                    },
                    {
                        id: 'terminal',
                        children: 'Terminal',
                        onClick: () => onOpenApp('terminal', 'Terminal'),
                    },
                    {
                        id: 'settings',
                        children: 'Settings',
                        onClick: () => onOpenApp('settings', 'Settings'),
                    },
                ],
            },
            {
                heading: 'Quick Apps',
                id: 'quick',
                items: [
                    {
                        id: 'photos',
                        children: 'Photos',
                        onClick: () => alert('Photos app coming soon!'),
                    },
                    {
                        id: 'music',
                        children: 'Music',
                        onClick: () => alert('Music app coming soon!'),
                    },
                    {
                        id: 'videos',
                        children: 'Videos',
                        onClick: () => alert('Videos app coming soon!'),
                    },
                    {
                        id: 'documents',
                        children: 'Documents',
                        onClick: () => alert('Documents app coming soon!'),
                    },
                    {
                        id: 'downloads',
                        children: 'Downloads',
                        onClick: () => alert('Downloads app coming soon!'),
                    },
                    {
                        id: 'calendar',
                        children: 'Calendar',
                        onClick: () => alert('Calendar app coming soon!'),
                    },
                ],
            },
        ],
        search,
    );

    return (
        <CommandPalette
            onChangeSearch={setSearch}
            onChangeOpen={handleClose}
            search={search}
            isOpen={isOpen}
            page={page}
            placeholder="Search for apps...">
            <CommandPalette.Page id="root">
                {filteredItems.length ? (
                    filteredItems.map((list) => (
                        <CommandPalette.List key={list.id} heading={list.heading}>
                            {list.items.map(({ id, ...rest }) => (
                                <CommandPalette.ListItem
                                    key={id}
                                    index={getItemIndex(filteredItems, id)}
                                    {...rest}
                                />
                            ))}
                        </CommandPalette.List>
                    ))
                ) : (
                    <CommandPalette.FreeSearchAction />
                )}
            </CommandPalette.Page>
        </CommandPalette>
    );
}
