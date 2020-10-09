import React from 'react';
import { getFolderIcon, getOpenFolderIcon, getFileIcon } from '@src/utils/utils';

type IconProps = {
  isDir?: boolean;
  isDirOpen?: boolean;
  entityName: string;
  size?: string;
}

export default function Icon({ entityName, size = "18px", isDir, isDirOpen }: IconProps) {
  let iconSrc;

  if (isDir) {
    if (isDirOpen) {
      iconSrc = getOpenFolderIcon(entityName);
    } else {
      iconSrc = getFolderIcon(entityName);
    }
  } else {
    iconSrc = getFileIcon(entityName);
  }

  return <img src={iconSrc} alt="" style={{ height: size }} />;
}
