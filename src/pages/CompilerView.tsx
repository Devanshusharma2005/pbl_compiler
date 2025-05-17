import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import InputField from '../components/InputField';
import OutputDisplay from '../components/OutputDisplay';
import { CommandPalette } from '../components/CommandPalette';
import { KeyboardShortcuts } from '../components/KeyboardShortcuts';
import { useCompiler } from '../hooks/useCompiler';
import { languageOptions } from '../utils/languageOptions';
import { getDefaultCode } from '../utils/codeTemplates';
import { Play, Maximize2, Minimize2, Save, Settings, Share } from 'lucide-react';
import { motion } from 'framer-motion';

const CompilerView = () => {
  const [language, setLanguage] = useState('py');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { compileCode, output, isLoading, error } = useCompiler();

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleRunCode();
      }
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [code, language, input]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleRunCode = () => {
    compileCode({
      code,
      language,
      std_input: input
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <CommandPalette
        onSelectLanguage={handleLanguageChange}
        onUpdateCode={setCode}
      />
      
      <motion.div 
        layout
        className={`${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 flex flex-row gap-4' 
            : 'flex flex-col gap-4'
        }`}
      >
        <motion.div 
          layout
          className={`${
            isFullscreen 
              ? 'flex-[2] min-h-full flex flex-col'
              : 'flex-1 min-h-[300px] flex flex-col'
          }`}
        >
          <motion.div 
            layout
            className="mb-4 flex flex-wrap gap-3 items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 relative z-20"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <LanguageSelector 
                  selected={language}
                  onSelect={handleLanguageChange}
                  options={languageOptions}
                />
              </div>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRunCode}
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <Play className="h-4 w-4" />
                {isLoading ? 'Running...' : 'Run Code'}
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <KeyboardShortcuts />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                aria-label="Save code snippet"
              >
                <Save className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                aria-label="Share code"
              >
                <Share className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            layout
            className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-200 relative z-10"
          >
            <CodeEditor
              language={language}
              value={code}
              onChange={setCode}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          layout
          className={`flex flex-col gap-4 ${
            isFullscreen 
              ? 'flex-1 min-w-[350px] max-w-[450px]'
              : ''
          }`}
        >
          <motion.div 
            layout
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-md"
          >
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              Input
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                (stdin)
              </span>
            </h3>
            <InputField 
              value={input}
              onChange={setInput}
              placeholder="Enter input for your program here..."
            />
          </motion.div>
          
          <motion.div 
            layout
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-md flex-1"
          >
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              Output
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                (stdout/stderr)
              </span>
            </h3>
            <OutputDisplay 
              output={output}
              error={error}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CompilerView;