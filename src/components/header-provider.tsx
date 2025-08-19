'use client';
import { createContext, useState } from "react";
import { Header } from "./header";

export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: (term: string) => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            <div className="flex min-h-screen flex-col bg-transparent">
                <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                {children}
            </div>
        </SearchContext.Provider>
    )
}
