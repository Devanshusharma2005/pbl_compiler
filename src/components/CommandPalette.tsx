import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useTheme } from '../contexts/ThemeContext';
import { languageOptions } from '../utils/languageOptions';
import { getDefaultCode } from '../utils/codeTemplates';

interface CommandPaletteProps {
  onSelectLanguage: (language: string) => void;
  onUpdateCode: (code: string) => void;
}

export function CommandPalette({ onSelectLanguage, onUpdateCode }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleLanguageSelect = (languageId: string) => {
    onSelectLanguage(languageId);
    onUpdateCode(getDefaultCode(languageId));
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Languages">
          {languageOptions.map((language) => (
            <CommandItem
              key={language.id}
              onSelect={() => handleLanguageSelect(language.id)}
            >
              {language.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => {
            toggleTheme();
            setOpen(false);
          }}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}