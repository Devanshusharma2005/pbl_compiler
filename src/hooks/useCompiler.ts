import { useState } from 'react';
import { compileCode as apiCompileCode } from '../services/api';

interface CompileRequestData {
  code: string;
  language: string;
  std_input: string;
}

interface CompileResponse {
  success: boolean;
  output?: string;
  error?: string;
}

export const useCompiler = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const compileCode = async (data: CompileRequestData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiCompileCode(data) as CompileResponse;
      
      if (response.success && response.output) {
        setOutput(response.output);
      } else {
        setError(response.error || 'An unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    output,
    error,
    isLoading,
    compileCode
  };
};