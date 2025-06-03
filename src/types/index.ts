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
  content: string;
  position: Position;
  size: Size;
  isMaximized: boolean;
  isMinimized: boolean;
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