
import React, { createContext, useContext, useState, useCallback } from 'react';

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  clearFilters: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [sortOption, setSortOption] = useState('Most Recent');

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => {
      if (category === 'All') {
        return ['All'];
      }
      
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev.filter(c => c !== 'All'), category];
      
      return newCategories.length === 0 ? ['All'] : newCategories;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategories(['All']);
    setSortOption('Most Recent');
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategories,
        toggleCategory,
        sortOption,
        setSortOption,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
