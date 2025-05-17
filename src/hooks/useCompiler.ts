import { useState } from 'react';

interface CompileParams {
  code: string;
  language: string;
  std_input: string;
}

interface CompileResult {
  output?: string;
  error?: string;
}

export function useCompiler() {
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const compileCode = async ({ code, language, std_input }: CompileParams) => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const response = await fetch('https://priyanshu-compiler.up.railway.app/api/compiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          std_input,
        }),
      });

      const result: CompileResult = await response.json();

      if (result.error) {
        setError(result.error);
      } else if (result.output) {
        setOutput(result.output);
      } else {
        setError('No output received from the compiler');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compile code');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    compileCode,
    output,
    error,
    isLoading,
  };
}