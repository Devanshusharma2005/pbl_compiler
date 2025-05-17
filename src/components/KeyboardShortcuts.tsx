import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Keyboard } from 'lucide-react';

const shortcuts = [
  { keys: ['⌘', 'K'], description: 'Open Command Palette' },
  { keys: ['⌘', 'Enter'], description: 'Run Code' },
  { keys: ['⌘', '/'], description: 'Toggle Comment' },
  { keys: ['⌘', 'F'], description: 'Find' },
  { keys: ['⌘', 'S'], description: 'Save Code Snippet' },
  { keys: ['⌘', 'B'], description: 'Toggle Sidebar' },
  { keys: ['F11'], description: 'Toggle Fullscreen' },
];

export function KeyboardShortcuts() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
          <Keyboard className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Master these shortcuts to boost your productivity
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}