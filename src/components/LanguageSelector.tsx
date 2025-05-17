import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { LanguageOption } from '../types';

interface LanguageSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
  options: LanguageOption[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLanguage = options.find(opt => opt.id === selected);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-48 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLanguage ? (
            <>
              <span className="flex items-center">
                {selectedLanguage.name}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </>
          ) : (
            'Select Language'
          )}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-all duration-200 overflow-hidden">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  selected === option.id 
                    ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white font-medium' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span>{option.name}</span>
                {selected === option.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;