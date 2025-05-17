import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

// Map our language identifiers to Monaco identifiers
const languageMap: Record<string, string> = {
  'py': 'python',
  'js': 'javascript',
  'ts': 'typescript',
  'go': 'go',
  'cpp': 'cpp',
  'c': 'c',
  'java': 'java',
  'rs': 'rust',
  'kt': 'kotlin',
  'cs': 'csharp'
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    if (editorRef.current) {
      // Configure editor theme
      monaco.editor.defineTheme('custom-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955' },
          { token: 'keyword', foreground: 'C586C0' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'operator', foreground: 'D4D4D4' }
        ],
        colors: {
          'editor.background': '#1E1E1E',
          'editor.foreground': '#D4D4D4',
          'editor.lineHighlightBackground': '#2F2F2F',
          'editorCursor.foreground': '#FFFFFF',
          'editor.selectionBackground': '#264F78',
          'editor.inactiveSelectionBackground': '#3A3D41'
        }
      });

      // Configure editor theme for light mode
      monaco.editor.defineTheme('custom-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '008000' },
          { token: 'keyword', foreground: '0000FF' },
          { token: 'string', foreground: 'A31515' },
          { token: 'number', foreground: '098658' },
          { token: 'operator', foreground: '000000' }
        ],
        colors: {
          'editor.background': '#FFFFFF',
          'editor.foreground': '#000000',
          'editor.lineHighlightBackground': '#F7F7F7',
          'editorCursor.foreground': '#000000',
          'editor.selectionBackground': '#ADD6FF',
          'editor.inactiveSelectionBackground': '#E5EBF1'
        }
      });

      // Initialize Monaco editor
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value,
        language: languageMap[language] || 'plaintext',
        theme: theme === 'dark' ? 'custom-dark' : 'custom-light',
        automaticLayout: true,
        minimap: { 
          enabled: true,
          scale: 0.75,
          renderCharacters: false,
          maxColumn: 80,
          showSlider: 'mouseover'
        },
        scrollBeyondLastLine: false,
        fontSize: window.innerWidth < 640 ? 13 : 14,
        fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Monaco", "Courier New", monospace',
        fontLigatures: true,
        lineNumbers: window.innerWidth < 640 ? 'off' : 'on',
        roundedSelection: true,
        selectOnLineNumbers: true,
        cursorStyle: 'line',
        cursorBlinking: 'smooth',
        smoothScrolling: true,
        contextmenu: true,
        mouseWheelZoom: true,
        lineHeight: 1.5,
        padding: { 
          top: window.innerWidth < 640 ? 8 : 10, 
          bottom: window.innerWidth < 640 ? 8 : 10 
        },
        scrollbar: {
          verticalScrollbarSize: window.innerWidth < 640 ? 8 : 10,
          horizontalScrollbarSize: window.innerWidth < 640 ? 8 : 10,
          verticalSliderSize: window.innerWidth < 640 ? 8 : 10,
          horizontalSliderSize: window.innerWidth < 640 ? 8 : 10,
          useShadows: true
        },
        renderLineHighlight: 'all',
        occurrencesHighlight: true,
        renderIndentGuides: window.innerWidth < 640 ? false : true,
        matchBrackets: 'always',
        renderWhitespace: window.innerWidth < 640 ? 'none' : 'selection',
        wordWrap: window.innerWidth < 640 ? 'on' : 'off'
      });

      // Add change event listener
      const changeDisposable = monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current?.getValue() || '';
        onChange(newValue);
        updateCounts(newValue);
      });

      // Handle window resize
      const handleResize = () => {
        if (monacoEditorRef.current) {
          monacoEditorRef.current.updateOptions({
            fontSize: window.innerWidth < 640 ? 13 : 14,
            lineNumbers: window.innerWidth < 640 ? 'off' : 'on',
            padding: { 
              top: window.innerWidth < 640 ? 8 : 10, 
              bottom: window.innerWidth < 640 ? 8 : 10 
            },
            renderIndentGuides: window.innerWidth < 640 ? false : true,
            renderWhitespace: window.innerWidth < 640 ? 'none' : 'selection',
            wordWrap: window.innerWidth < 640 ? 'on' : 'off'
          });
        }
      };

      window.addEventListener('resize', handleResize);

      // Initial counts update
      updateCounts(value);

      return () => {
        changeDisposable.dispose();
        monacoEditorRef.current?.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const updateCounts = (text: string) => {
    setLineCount(text.split('\n').length);
    setCharCount(text.length);
  };

  // Update language when it changes
  useEffect(() => {
    if (monacoEditorRef.current) {
      const model = monacoEditorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, languageMap[language] || 'plaintext');
      }
    }
  }, [language]);

  // Update theme when it changes
  useEffect(() => {
    if (monacoEditorRef.current) {
      monacoEditorRef.current.updateOptions({
        theme: theme === 'dark' ? 'custom-dark' : 'custom-light'
      });
    }
  }, [theme]);

  // Update value when it changes from external source
  useEffect(() => {
    if (monacoEditorRef.current && value !== monacoEditorRef.current.getValue()) {
      monacoEditorRef.current.setValue(value);
      updateCounts(value);
    }
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative h-[calc(100vh-24rem)] sm:h-[500px] w-full group">
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </motion.button>
      </div>
      <div ref={editorRef} className="h-full w-full" />
      <div className="absolute bottom-2 right-2 z-10 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        {lineCount} lines | {charCount} characters
      </div>
    </div>
  );
};

export default CodeEditor;