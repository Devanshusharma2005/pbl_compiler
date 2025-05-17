export interface LanguageOption {
  id: string;
  name: string;
  extension: string;
}

export interface CompileResponse {
  success: boolean;
  output?: string;
  error?: string;
  timestamp: string;
}

export interface CompilerState {
  code: string;
  language: string;
  input: string;
  output: string;
  error: string | null;
  isLoading: boolean;
}