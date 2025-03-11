
import React, { useState } from 'react';
import { ArrowDownUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/context/SearchContext';

const ProjectSort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sortOption, setSortOption } = useSearch();

  const sortOptions = [
    'Most Recent', 'Most Popular', 'Most Liked', 'Alphabetical (A-Z)', 'Alphabetical (Z-A)'
  ];

  const handleSortSelect = (option: string) => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <ArrowDownUp className="h-5 w-5" />
        <span className="hidden sm:inline">Sort</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-20 py-2 border border-gray-200 dark:border-gray-700 animate-fade-in">
          {sortOptions.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => handleSortSelect(option)}
            >
              <span className="text-sm">{option}</span>
              {sortOption === option && <Check className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSort;
