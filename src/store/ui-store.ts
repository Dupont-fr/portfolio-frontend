import { create } from 'zustand'

interface UIState {
  isMenuOpen: boolean
  isPreloaderDone: boolean
  setMenuOpen: (open: boolean) => void
  setPreloaderDone: (done: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isPreloaderDone: false,
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  setPreloaderDone: (isPreloaderDone) => set({ isPreloaderDone }),
}))
