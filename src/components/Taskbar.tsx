import React from 'react';
import type { WindowData } from '../types/index.ts';

export const Taskbar: React.FC<{
  windows: WindowData[];
  activeWindow: string | null;
  onWindowRestore: (windowId: string) => void;
  onWindowFocus: (windowId: string) => void;
}> = ({ windows, activeWindow, onWindowRestore, onWindowFocus }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-blue-600 to-blue-800 border-t-2 border-blue-400 flex items-center px-2">
      {/* Start Button */}
      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-bold border border-green-700">
        Start
      </button>

      {/* Taskbar Buttons */}
      <div className="flex space-x-1 ml-2">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => window.isMinimized ? onWindowRestore(window.id) : onWindowFocus(window.id)}
            className={`px-3 py-1 text-sm border rounded ${
              activeWindow === window.id && !window.isMinimized
                ? 'bg-blue-300 border-blue-500'
                : 'bg-blue-500 hover:bg-blue-400 border-blue-700 text-white'
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="ml-auto text-white text-sm">
        {currentTime}
      </div>
    </div>
  );
};