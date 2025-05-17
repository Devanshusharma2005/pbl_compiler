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
const languageMap: { [key: string]: string } = {
  'py': 'python',
  'js': 'javascript',
  'ts': 'typescript',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'go': 'go',
  'rs': 'rust',
  'kt': 'kotlin',
  'cs': 'csharp',
  'bac': 'plaintext'
};

// Register custom themes
monaco.editor.defineTheme('custom-dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'type', foreground: '4EC9B0' }
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#D4D4D4',
    'editor.lineHighlightBackground': '#2F2F2F',
    'editorLineNumber.foreground': '#858585',
    'editorLineNumber.activeForeground': '#C6C6C6',
    'editor.selectionBackground': '#264F78',
    'editor.inactiveSelectionBackground': '#3A3D41',
    'editorBracketMatch.background': '#0D3A58',
    'editorBracketMatch.border': '#888888'
  }
});

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    if (editorRef.current) {
      // Set up Monaco editor
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value,
        language: languageMap[language] || 'plaintext',
        theme: 'custom-dark',
        automaticLayout: true,
        minimap: { 
          enabled: false
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: '"Fira Code", monospace',
        fontLigatures: true,
        lineNumbers: 'on',
        roundedSelection: false,
        selectOnLineNumbers: true,
        cursorStyle: 'line',
        cursorBlinking: 'smooth',
        smoothScrolling: true,
        contextmenu: true,
        mouseWheelZoom: true,
        lineHeight: 21,
        padding: { 
          top: 16,
          bottom: 16
        },
        scrollbar: {
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        },
        overviewRulerLanes: 0,
        lineDecorationsWidth: 0,
        renderLineHighlight: 'all',
        matchBrackets: 'always',
        renderWhitespace: 'selection',
        wordWrap: 'off',
        fixedOverflowWidgets: true,
        tabSize: 4,
        insertSpaces: true,
        guides: {
          indentation: true,
          highlightActiveIndentation: true,
          bracketPairs: true
        }
      });

      // Add change event listener
      const changeDisposable = monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current?.getValue() || '';
        onChange(newValue);
        updateCounts(newValue);
      });

      // Initial counts update
      updateCounts(value);

      return () => {
        changeDisposable.dispose();
        monacoEditorRef.current?.dispose();
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
    <div className="h-full w-full relative bg-[#1E1E1E]">
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