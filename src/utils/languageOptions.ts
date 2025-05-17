export interface LanguageOption {
  id: string;
  name: string;
  extension: string;
}

export const languageOptions: LanguageOption[] = [
  { id: 'py', name: 'Python', extension: '.py' },
  { id: 'js', name: 'JavaScript', extension: '.js' },
  { id: 'ts', name: 'TypeScript', extension: '.ts' },
  { id: 'java', name: 'Java', extension: '.java' },
  { id: 'cpp', name: 'C++', extension: '.cpp' },
  { id: 'c', name: 'C', extension: '.c' },
  { id: 'go', name: 'Go', extension: '.go' },
  { id: 'rs', name: 'Rust', extension: '.rs' },
  { id: 'kt', name: 'Kotlin', extension: '.kt' },
  { id: 'cs', name: 'C#', extension: '.cs' },
  { id: 'bac', name: 'BasicCode (bac)', extension: '.bac' }
];