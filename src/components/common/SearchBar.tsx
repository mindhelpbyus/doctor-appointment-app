import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search...", defaultValue = '' }) => {
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
    <div className="flex w-full max-w-2xl mx-auto space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow"
      />
      <Button onClick={handleSearch}>
        <SearchIcon className="h-5 w-5 mr-2" /> Search
      </Button>
    </div>
  );
};

export default SearchBar;