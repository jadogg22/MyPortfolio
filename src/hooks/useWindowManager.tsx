import { useEffect, useState } from 'react';
import type { DesktopIcon, WindowData, DragState } from '../types';

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragId: null,
    offset: { x: 0, y: 0 }
  });

  const openWindow = (icon: DesktopIcon) => {
  const existingWindow = windows.find(w => w.id === icon.id);
  if (existingWindow) {
    setActiveWindow(existingWindow.id);
    return;
  }

  const maxWidth = window.innerWidth - 40;
  const maxHeight = window.innerHeight - 60; 

  const defaultWidth = 600;
  const defaultHeight = 400;

  const width = Math.min(defaultWidth, maxWidth);
  const height = Math.min(defaultHeight, maxHeight);

  const offsetX = 100 + windows.length * 30;
  const offsetY = 100 + windows.length * 30;

  const x = Math.max(0, Math.min(offsetX, maxWidth - width));
  const y = Math.max(0, Math.min(offsetY, maxHeight - height));

  const newWindow: WindowData = {
    id: icon.id,
    title: icon.name,
    content: icon.content,
    position: { x, y },
    size: { width, height },
    isMaximized: false,
    isMinimized: false
  };

  setWindows([...windows, newWindow]);
  setActiveWindow(newWindow.id);
};


  const closeWindow = (windowId: string) => {
    setWindows(windows.filter(w => w.id !== windowId));
    setActiveWindow(null);
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(windows.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    setActiveWindow(null);
  };

  const maximizeWindow = (windowId: string) => {
  setWindows(prevWindows =>
    prevWindows.map(w => {
      if (w.id !== windowId) return w;

      if (w.isMaximized) {
        // Restore to previous position and size
        return {
          ...w,
          isMaximized: false,
          position: w.prevPosition ?? w.position,
          size: w.prevSize ?? w.size,
          prevPosition: undefined,
          prevSize: undefined
        };
      } else {
        // Save current state before maximizing
        return {
          ...w,
          isMaximized: true,
          prevPosition: w.position,
          prevSize: w.size,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 40 }
        };
      }
    })
  );
};


  const restoreWindow = (windowId: string) => {
    setWindows(windows.map(w =>
      w.id === windowId ? { ...w, isMinimized: false } : w
    ));
    setActiveWindow(windowId);
  };

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;

    const win = windows.find(w => w.id === windowId);
    if (!win) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setDragState({
      isDragging: true,
      dragId: windowId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });

    setActiveWindow(windowId);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging || !dragState.dragId) return;

      const draggingWindow = windows.find(w => w.id === dragState.dragId);
      if (!draggingWindow) return;

      setWindows(prev =>
        prev.map(w =>
          w.id === dragState.dragId
            ? {
                ...w,
                position: {
                  x: Math.max(0, Math.min(e.clientX - dragState.offset.x, window.innerWidth - w.size.width)),
                  y: Math.max(0, Math.min(e.clientY - dragState.offset.y, window.innerHeight - w.size.height - 40))
                }
              }
            : w
        )
      );
    };

    const handleMouseUp = () => {
      setDragState({ isDragging: false, dragId: null, offset: { x: 0, y: 0 } });
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, windows]);

  return {
    windows,
    activeWindow,
    dragState,
    setActiveWindow,
    setDragState,
    setWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    handleMouseDown
  };
};
