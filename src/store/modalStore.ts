import { create } from "zustand";

interface ModalState {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setIsAuthModalOpen: (value: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalOpen: false,

  // ✅ explicit open/close methods
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  // ✅ optional: direct setter for flexibility
  setIsAuthModalOpen: (value) => set({ isAuthModalOpen: value }),
}));
