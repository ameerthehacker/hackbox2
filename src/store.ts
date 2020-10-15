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
  currentColor: string;
  setCurrentColor: (color: string) => void;
  isColorPickerVisible: boolean;
  setIsColorPickerVisible: (isVisible: boolean) => void;
}

export const useStore = createStore<State>(set => ({
  isOnigasmLoaded: false,
  setOnigasmLoaded: () => set(() => ({ isOnigasmLoaded: true })),
  openFiles: [],
  setOpenFiles: (files) => set(() => ({ openFiles: files })),
  selectedFile: '',
  setSelectedFile: (filePath) => set(() => ({ selectedFile: filePath })),
  theme: shadesOfPurple,
  setTheme: (theme) => set(() => ({ theme })),
  currentColor: '',
  setCurrentColor: (color) => set(() => ({ currentColor: color })),
  isColorPickerVisible: false,
  setIsColorPickerVisible: (isVisible: boolean) => set(() => ({ isColorPickerVisible: isVisible }))
}));
