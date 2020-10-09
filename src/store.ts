import createStore from 'zustand';

type State = {
  isOnigasmLoaded: boolean
  setOnigasmLoaded: () => void,
  openFiles: string[],
  setOpenFiles: (files: string[]) => void,
  selectedFile: string;
  setSelectedFile: (filePath: string) => void
}

export const useStore = createStore<State>(set => ({
  isOnigasmLoaded: false,
  setOnigasmLoaded: () => set(() => ({ isOnigasmLoaded: true })),
  openFiles: [],
  setOpenFiles: (files) => set((state) => ({ openFiles: files })),
  selectedFile: '',
  setSelectedFile: (filePath) => set((state) => ({ selectedFile: filePath }))
}));
