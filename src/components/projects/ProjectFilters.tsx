
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/context/SearchContext';

const ProjectFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategories, toggleCategory, clearFilters } = useSearch();

  // Available filter categories
  const categories = [
    'All', 'AI', 'Machine Learning', 'NLP', 'Data Analysis', 
    'Computer Vision', 'Robotics', 'Generative AI', 'Collaboration'
  ];

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Filter className="h-5 w-5" />
        <span>Filter</span>
        {selectedCategories.length > 0 && selectedCategories[0] !== 'All' && (
          <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedCategories.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-20 p-4 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Categories</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="h-7 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="rounded-full text-xs py-1 px-3 h-8"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;
