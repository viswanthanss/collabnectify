
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/context/SearchContext';

type Suggestion = {
  id: string;
  type: 'project' | 'user' | 'discussion';
  name: string;
};

const ProjectSearch = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Mock suggestions data - in a real app, this would come from API
  const mockSuggestions: Suggestion[] = [
    { id: '1', type: 'project', name: 'Neural Network Optimization' },
    { id: '2', type: 'project', name: 'NLP Analysis Tool' },
    { id: '3', type: 'user', name: 'Alex Johnson (AI Researcher)' },
    { id: '4', type: 'discussion', name: 'Latest advancements in GPT models' },
    { id: '5', type: 'project', name: 'Computer Vision Framework' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      // Filter suggestions based on search term
      const filtered = mockSuggestions.filter(
        suggestion => suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="search"
          placeholder="Search projects, users, discussions..."
          className="pl-10 pr-10 rounded-xl transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
        />
        {searchTerm && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-200 dark:border-gray-700 animate-fade-in"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="w-2 h-2 rounded-full mr-2" 
                style={{ 
                  backgroundColor: suggestion.type === 'project' 
                    ? '#3b82f6' 
                    : suggestion.type === 'user' 
                      ? '#10b981' 
                      : '#8b5cf6' 
                }}
              />
              <div>
                <p className="text-sm font-medium">{suggestion.name}</p>
                <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSearch;
