import { create } from "zustand";

export type ShellCounterState = {
  count: number;
  isLoading: boolean;
  error: string | null;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
  reset: () => void;
  loadCount: () => Promise<void>;
};

// Fake async fetch to simulate loading data into the store
const fetchCount = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Math.floor(Math.random() * 1000);
};

const useShellCounterStore = create<ShellCounterState>((set) => ({
  count: 0,
  isLoading: false,
  error: null,
  increment: (by = 1) =>
    set((state) => ({
      count: state.count + by
    })),
  decrement: (by = 1) =>
    set((state) => ({
      count: state.count - by
    })),
  reset: () => set({ count: 0 }),
  loadCount: async () => {
    set({ isLoading: true, error: null });
    try {
      const value = await fetchCount();
      set({ count: value, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load count"
      });
    }
  }
}));

export default useShellCounterStore;
