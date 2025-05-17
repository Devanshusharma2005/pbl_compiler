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
import { 
  Play, 
  ChevronLeft,
  Home,
  FolderOpen,
  Code2,
  Terminal,
  Settings,
  Share,
  Download,
  Upload,
  BookOpen,
  HelpCircle,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const CompilerView = () => {
  const [language, setLanguage] = useState('cpp');
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

  return (
    <>
      <CommandPalette
        onSelectLanguage={handleLanguageChange}
        onUpdateCode={setCode}
      />
      
      <div className="flex h-screen bg-background">
        {/* Left Sidebar */}
        <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-6">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            <Home className="w-5 h-5" />
          </Link>
          <button className="text-muted-foreground hover:text-primary">
            <FolderOpen className="w-5 h-5" />
          </button>
          <button className="text-primary">
            <Code2 className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-primary">
            <Terminal className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-primary">
            <BookOpen className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="text-muted-foreground hover:text-primary">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-primary">
            <Info className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="h-12 border-b border-border flex items-center px-4 gap-2 bg-card/50">
            <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-1">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary">Quick compiler</span>
          </div>

          <div className="flex-1 flex">
            {/* Main Editor Section */}
            <div className="flex-1 flex flex-col">
              {/* Editor Header */}
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card/50">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">SOURCE -</span>
                  <span className="text-primary">main.{language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSelector 
                    selected={language}
                    onSelect={handleLanguageChange}
                    options={languageOptions}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRunCode}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 font-medium py-1.5 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="h-4 w-4" />
                    {isLoading ? 'Running...' : 'Run'}
                  </motion.button>
                  <div className="h-6 w-px bg-border mx-2" />
                  <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md transition-colors">
                    <Upload className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={setCode}
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-[400px] border-l border-border flex flex-col">
              {/* Input Section */}
              <div className="flex-1 flex flex-col">
                <div className="h-12 border-b border-border flex items-center px-4 bg-card/50">
                  <span className="text-muted-foreground">STDIN</span>
                </div>
                <div className="flex-1 p-4">
                  <InputField 
                    value={input}
                    onChange={setInput}
                    placeholder="Your Input Goes Here ..."
                  />
                </div>
              </div>

              {/* Output Section */}
              <div className="flex-1 flex flex-col border-t border-border">
                <div className="h-12 border-b border-border flex items-center px-4 bg-card/50">
                  <span className="text-muted-foreground">STDOUT</span>
                </div>
                <div className="flex-1 p-4">
                  <OutputDisplay 
                    output={output}
                    error={error}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompilerView; 