import createStore from 'zustand';

type State = {
  isOnigasmLoaded: boolean
  setOnigasmLoaded: () => void
}

export const useStore = createStore<State>(set => ({
  isOnigasmLoaded: false,
  setOnigasmLoaded: () => set(() => ({ isOnigasmLoaded: true }))
}));
