'use client';
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Header } from "./header";

export type FeedView = 'home' | 'videos';

export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: (term: string) => {},
    view: 'home' as FeedView,
    setView: (() => {}) as Dispatch<SetStateAction<FeedView>>,
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<FeedView>('home');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, view, setView }}>
            <div className="flex min-h-screen flex-col bg-transparent">
                <Header 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm}
                    view={view}
                    onViewChange={setView} 
                />
                {children}
            </div>
        </SearchContext.Provider>
    )
}
