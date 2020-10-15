import createStore from 'zustand';
import shadesOfPurple from './themes/shades-of-purple';

type State = {
  isOnigasmLoaded: boolean
  setOnigasmLoaded: () => void,
  openFiles: string[],
  setOpenFiles: (files: string[]) => void,
  selectedFile: string;
  setSelectedFile: (filePath: string) => void,
  theme: any;
  setTheme: (theme: any) => void;
}

export const useStore = createStore<State>(set => ({
  isOnigasmLoaded: false,
  setOnigasmLoaded: () => set(() => ({ isOnigasmLoaded: true })),
  openFiles: [],
  setOpenFiles: (files) => set((state) => ({ openFiles: files })),
  selectedFile: '',
  setSelectedFile: (filePath) => set((state) => ({ selectedFile: filePath })),
  theme: shadesOfPurple,
  setTheme: (theme) => set(() => ({ theme }))
}));
