import { CompileResponse } from '../types';

const API_BASE_URL = 'https://priyanshu-compiler.up.railway.app';

export const compileCode = async (data: {
  code: string;
  language: string;
  std_input: string;
}): Promise<CompileResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/compiler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || `HTTP error ${response.status}`,
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return {
          success: false,
          error: `HTTP error ${response.status}`,
          timestamp: new Date().toISOString(),
        };
      }
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      timestamp: new Date().toISOString(),
    };
  }
};

export const getSupportedLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/languages`);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Network error');
  }
};