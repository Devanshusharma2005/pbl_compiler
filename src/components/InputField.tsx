import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Copy, Check } from 'lucide-react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy input:', err);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="w-full relative group">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-24 sm:h-32 resize-none rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 sm:p-3 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        spellCheck="false"
      />
      
      <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Copy input"
        >
          {copied ? (
            <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          )}
        </motion.button>
        
        {value && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Clear input"
          >
            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
          </motion.button>
        )}
      </div>
      
      <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {value.length} characters
      </div>
    </div>
  );
};

export default InputField;