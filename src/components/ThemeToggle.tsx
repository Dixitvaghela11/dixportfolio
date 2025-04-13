
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full shadow-md ${
        theme === 'light' 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
          : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
      } transition-colors`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
