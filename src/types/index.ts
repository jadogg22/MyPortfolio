interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode | string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
}


interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  content: string;
}

interface DragState {
  isDragging: boolean;
  dragId: string | null;
  offset: Position;
}

export type { WindowData, DesktopIcon, DragState, Position, Size };