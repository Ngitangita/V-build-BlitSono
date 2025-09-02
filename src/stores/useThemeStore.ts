import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
