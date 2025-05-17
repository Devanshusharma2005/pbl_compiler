import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Copy, Check, AlertCircle, Terminal } from 'lucide-react';

interface OutputDisplayProps {
  output: string;
  error: string | null;
  isLoading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(error || output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy output:', err);
    }
  };

  const content = error || output;

  return (
    <div className="w-full h-48 sm:h-72 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 relative group">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center p-2 sm:p-4"
          >
            <Loader2 className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500 animate-spin mb-2 sm:mb-3" />
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Running code...</span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">This may take a few seconds</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-red-500/10 border-b border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
              <span className="text-sm sm:text-base font-medium text-red-600 dark:text-red-400">Execution Error</span>
            </div>
            <pre className="p-2 sm:p-4 flex-1 overflow-auto whitespace-pre-wrap text-xs sm:text-sm font-mono text-red-600 dark:text-red-400">{error}</pre>
          </motion.div>
        ) : output ? (
          <motion.div
            key="output"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-green-500/10 border-b border-green-200 dark:border-green-800">
              <Terminal className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
              <span className="text-sm sm:text-base font-medium text-green-600 dark:text-green-400">Program Output</span>
            </div>
            <pre className="p-2 sm:p-4 flex-1 overflow-auto whitespace-pre-wrap text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">{output}</pre>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center p-2 sm:p-4 text-gray-500 dark:text-gray-400"
          >
            <Terminal className="w-8 sm:w-12 h-8 sm:h-12 mb-2 sm:mb-3 opacity-50" />
            <p className="text-sm sm:text-base text-center font-medium">Output will appear here</p>
            <p className="text-xs sm:text-sm opacity-75 mt-1">Run your code to see the results</p>
          </motion.div>
        )}
      </AnimatePresence>

      {(error || output) && (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Copy output"
          >
            {copied ? (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </motion.button>
        </div>
      )}

      {(error || output) && (
        <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {content.length} characters
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;