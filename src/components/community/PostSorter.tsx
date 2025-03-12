
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Check } from 'lucide-react';

interface PostSorterProps {
  onSortChange: (option: string) => void;
  currentSort: string;
}

const PostSorter = ({ onSortChange, currentSort }: PostSorterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortOptions = ["Most Recent", "Most Liked", "Most Viewed"];
  
  const handleSortSelect = (option: string) => {
    onSortChange(option);
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
        <span className="hidden sm:inline">Sort: {currentSort}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg z-20 py-2 border border-border animate-fade-in">
          {sortOptions.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center justify-between"
              onClick={() => handleSortSelect(option)}
            >
              <span className="text-sm">{option}</span>
              {currentSort === option && <Check className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostSorter;
