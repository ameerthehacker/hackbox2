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

/* eslint-disable no-loop-func */
export function convertFilesToTree(files: Record<string, string>) {
  let tree: any = [];

  for (const file in files) {
    const fileParts = file.split('/');
    let currentRoot = tree;

    fileParts.forEach((filePart, index) => {
      const currentPath = fileParts.slice(0, index + 1).join('/');
      const node = currentRoot.find((node: any) => node.path === currentPath);

      if (!node) {
        const isDir = index !== fileParts.length - 1;
        const newNode = {
          id: currentPath,
          path: currentPath,
          isDir,
          children: []
        };

        currentRoot.push(newNode);

        currentRoot = newNode.children;
      } else {
        if (!node.children) {
          node.children = [];
        }

        currentRoot = node.children;
      }
    });
  }

  return tree;
}
