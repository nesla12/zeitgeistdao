import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Users, TreePine, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'course' | 'community' | 'project' | 'resource';
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock results
        const mockResults: SearchResult[] = [
          {
            id: '1',
            type: 'course',
            title: 'Mindfulness Fundamentals',
            description: 'Learn the basics of mindfulness meditation',
            icon: <BookOpen className="w-5 h-5 text-blue-500" />,
            link: '/learn'
          },
          {
            id: '2',
            type: 'community',
            title: 'Consciousness Circle',
            description: 'Join our weekly consciousness discussions',
            icon: <Users className="w-5 h-5 text-purple-500" />,
            link: '/social'
          },
          {
            id: '3',
            type: 'project',
            title: 'Global Reforestation',
            description: 'Participate in our tree planting initiative',
            icon: <TreePine className="w-5 h-5 text-green-500" />,
            link: '/impact'
          }
        ].filter(result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(mockResults);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl mx-4">
        <div className="p-4 border-b flex items-center">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for resources, courses, or topics..."
            className="flex-1 ml-3 outline-none text-gray-800"
          />
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y">
              {results.map((result) => (
                <Link
                  key={result.id}
                  to={result.link}
                  onClick={onClose}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {result.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.description}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 capitalize">{result.type}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <h3 className="font-medium text-gray-900">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Meditation', 'Personal Growth', 'Community', 'Impact'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchDialog;