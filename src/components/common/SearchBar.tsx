import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search for doctors, specialties, or clinics...", defaultValue = '' }) => { // More descriptive placeholder
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-3xl mx-auto space-x-3 p-1 bg-background rounded-full shadow-medium border border-granite focus-within:border-basil transition-all duration-300"> {/* Enhanced container styling */}
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground placeholder:text-stone px-4 text-lg font-averta" // Removed border, transparent background, larger text
      />
      <Button onClick={handleSearch} variant="custom-primary" size="custom-sm" className="rounded-full px-6 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"> {/* Rounded button, larger, with shadow */}
        <SearchIcon className="h-5 w-5 mr-2" /> Search
      </Button>
    </div>
  );
};

export default SearchBar;