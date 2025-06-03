import React from 'react';
import type { WindowData } from '../types/index'; // Adjust the import path as necessary

export const Window: React.FC<{
  window: WindowData;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent, windowId: string) => void;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onMaximize: (windowId: string) => void;
  children: React.ReactNode;
}> = ({ window, isActive, onMouseDown, onClose, onMinimize, onMaximize, children }) => {
  if (window.isMinimized) return null;

  return (
    <div
      className={`absolute bg-gray-200 border-2 border-gray-400 rounded-t-lg shadow-lg ${
        isActive ? 'z-50' : 'z-40'
      }`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }}
      onMouseDown={(e) => onMouseDown(e, window.id)}
    >
      {/* Title Bar */}
      <div className={`h-8 bg-gradient-to-r ${
        isActive 
          ? 'from-blue-600 to-blue-800' 
          : 'from-gray-400 to-gray-600'
      } flex items-center justify-between px-2 cursor-move rounded-t-lg`}
      onMouseDown={(e) => {
  e.stopPropagation();
  onMouseDown(e, window.id);
}}>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-bold">{window.title}</span>
        </div>
        <div className="flex space-x-1 window-controls">
          <button
            onClick={() => onMinimize(window.id)}
            className="w-6 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 text-xs flex items-center justify-center"
          >
            _
          </button>
          <button
            onClick={() => onMaximize(window.id)}
            className="w-6 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 text-xs flex items-center justify-center"
          >
            □
          </button>
          <button
            onClick={() => onClose(window.id)}
            className="w-6 h-5 bg-red-500 hover:bg-red-600 border border-red-700 text-white text-xs flex items-center justify-center"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full bg-white overflow-auto">
        {children}
      </div>
    </div>
  );
};