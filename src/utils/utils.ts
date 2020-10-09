import { getIconForFile, getIconForFolder, getIconForOpenFolder } from "vscode-material-icon-theme-js";

const vscodeMaterialIcons = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons';

export function getBasename(filename: string) {
  const fileParts = filename.split('/');

  if (fileParts.length > 0) return fileParts[fileParts.length - 1];
  else return "";
}

export function getFileIcon(filename: string) {
  return `${vscodeMaterialIcons}/${getIconForFile(filename)}`;
}

export function getFolderIcon(filename: string) {
  return `${vscodeMaterialIcons}/${getIconForFolder(filename)}`;
}

export function getOpenFolderIcon(filename: string) {
  return `${vscodeMaterialIcons}/${getIconForOpenFolder(filename)}`;
}
