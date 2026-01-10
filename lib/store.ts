import { create } from 'zustand';

interface AppState {
  // UI State
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  toggleSearch: (open: boolean) => void;
  toggleAuthModal: (open: boolean) => void;

  // Auth State (Mocked for now)
  isAuthenticated: boolean;
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSearchOpen: false,
  isAuthModalOpen: false,
  toggleSearch: (open) => set({ isSearchOpen: open }),
  toggleAuthModal: (open) => set({ isAuthModalOpen: open }),

  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));