import React from 'react';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { DesktopIcon } from './components/DesktopIcon';
import { useWindowManager } from './hooks/useWindowManager';
import { PortfolioContent } from './components/content/PortfolioContent';
import { ProjectsContent } from  './components/content/ProjectsContent.tsx';
import { ResumeContent } from './components/content/ResumeContent.tsx';
import { NotepadContent } from './components/content/NotepadContent.tsx';

import type { DesktopIcon as DesktopIconType } from './types';

const WindowsXPPortfolio: React.FC = () => {
  const {
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
  } = useWindowManager();

  const desktopIcons: DesktopIconType[] = [
    { id: 'portfolio', name: 'My Portfolio', icon: '📁', content: 'Portfolio Content' },
    { id: 'projects', name: 'Web Projects', icon: '🌐', content: 'My Web Development Projects' },
    { id: 'about', name: 'About Me', icon: '👤', content: 'About Me Information' },
    { id: 'contact', name: 'Contact', icon: '📧', content: 'Contact Information' },
    { id: 'resume', name: 'Resume', icon: '📄', content: 'My Resume' },
    { id: 'notepad', name: 'Notepad', icon: '📝', content: 'Simple Notepad' }
  ];

  // This function returns the content for each window based on its ID
  const getWindowContent = (windowId: string): React.ReactNode => {
    switch(windowId) {
      case 'portfolio':
        return <PortfolioContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'resume':
        return <ResumeContent />;
      case 'notepad':
        return <NotepadContent onClose={() => closeWindow(windowId)} />;
      default:
        return <div className="p-4">Content for {windowId}</div>;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
      {/* Desktop */}
      <div className="h-full pb-10 p-4">
        {/* Desktop Icons */}
        <div className="grid grid-cols-1 gap-6 w-20">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              onDoubleClick={openWindow}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindow === window.id}
            onMouseDown={handleMouseDown}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
          >
            {getWindowContent(window.id)}
          </Window>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowRestore={restoreWindow}
        onWindowFocus={setActiveWindow}
      />
    </div>
  );
};

export default WindowsXPPortfolio;