import { useState, useCallback } from 'react';
import { ReactNode } from 'react';

export interface TabData {
    id: string;
    title: string;
    content: ReactNode;
}

interface TabsState {
    [key: string]: TabData;
}

export const useTabManager = () => {
    const [tabs, setTabs] = useState<TabsState>({});
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const addTab = useCallback((tabData: TabData) => {
        setTabs(prev => {
            // If tab already exists, just switch to it
            if (prev[tabData.id]) {
                setActiveTabId(tabData.id);
                return prev;
            }
            // Add new tab and switch to it
            const newTabs = { ...prev, [tabData.id]: tabData };
            setActiveTabId(tabData.id);
            return newTabs;
        });
    }, []);

    const removeTab = useCallback((tabId: string) => {
        setTabs(prev => {
            const newTabs = { ...prev };
            delete newTabs[tabId];
            
            setActiveTabId(currentActiveId => {
                if (currentActiveId === tabId) {
                    const remainingTabIds = Object.keys(newTabs);
                    return remainingTabIds.length > 0 ? remainingTabIds[remainingTabIds.length - 1] : null;
                }
                return currentActiveId;
            });
            
            return newTabs;
        });
    }, []);
    
    const clearAllTabs = useCallback(() => {
        setTabs({});
        setActiveTabId(null);
    }, []);

    return { tabs, activeTabId, addTab, removeTab, setActiveTabId, clearAllTabs };
};
