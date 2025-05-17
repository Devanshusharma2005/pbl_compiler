import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import InputField from './InputField';
import OutputDisplay from './OutputDisplay';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { useCompiler } from '../hooks/useCompiler';
import { languageOptions } from '../utils/languageOptions';
import { getDefaultCode } from '../utils/codeTemplates';
import { Play, Maximize2, Minimize2, Save, Settings, Share, ChevronLeft } from 'lucide-react';
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
            ? 'fixed inset-0 top-16 z-50 bg-background p-4 flex flex-row gap-4'
            : 'flex flex-col gap-4 p-4 relative'
        }`}
      >
        <motion.div 
          layout
          className={`${
            isFullscreen 
              ? 'flex-[2] min-h-full flex flex-col'
              : 'flex-1 min-h-[calc(100vh-8rem)] flex flex-col'
          }`}
        >
          <motion.div 
            layout
            className="mb-4 flex flex-wrap gap-3 items-center justify-between bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border relative z-20"
          >
            <div className="flex flex-wrap items-center gap-3">
              {!isFullscreen && (
                <Link
                  to="/"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Back</span>
                </Link>
              )}
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
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
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
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                aria-label="Save code snippet"
              >
                <Save className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                aria-label="Share code"
              >
                <Share className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            layout
            className="flex-1 bg-card rounded-lg shadow-lg overflow-hidden border border-border backdrop-blur-sm transition-all duration-200 relative z-10"
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
            className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border shadow-md"
          >
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-foreground">
              Input
              <span className="text-sm font-normal text-muted-foreground">
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
            className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border shadow-md flex-1"
          >
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-foreground">
              Output
              <span className="text-sm font-normal text-muted-foreground">
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