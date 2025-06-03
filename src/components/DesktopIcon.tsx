import React from 'react';
import type { DesktopIcon as DesktopIconType } from '../types';

export const DesktopIcon: React.FC<{
  icon: DesktopIconType;
  onDoubleClick: (icon: DesktopIconType) => void;
}> = ({ icon, onDoubleClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      onDoubleClick={() => onDoubleClick(icon)}
    >
      <div className="text-3xl mb-1 group-hover:bg-blue-400 group-hover:bg-opacity-50 rounded p-1">
        {icon.icon}
      </div>
      <span className="text-white text-xs text-center bg-blue-800 bg-opacity-50 px-1 rounded group-hover:bg-blue-700">
        {icon.name}
      </span>
    </div>
  );
};