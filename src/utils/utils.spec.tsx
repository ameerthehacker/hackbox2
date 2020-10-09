import { convertFilesToTree } from './utils';

const sampleFiles = {
  'public/index.html': '',
  'src/index.tsx': '',
  'src/index.css': '',
  'package.json': ''
};

describe('utils', () => {
  it('convertFilesToTree should convert files object to tree', () => {
    expect(convertFilesToTree(sampleFiles)).toEqual([
      {
        id: 'public',
        path: 'public',
        isDir: true,
        children: [
          {
            id: 'public/index.html',
            path: 'public/index.html',
            isDir: false,
            children: []
          }
        ]
      },
      {
        id: 'src',
        path: 'src',
        isDir: true,
        children: [
          {
            id: 'src/index.tsx',
            isDir: false,
            path: 'src/index.tsx',
            children: []
          },
          {
            id: 'src/index.css',
            isDir: false,
            path: 'src/index.css',
            children: []
          }
        ]
      },
      {
        id: 'package.json',
        path: 'package.json',
        isDir: false,
        children: []
      }
    ]);
  });
});
