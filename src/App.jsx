import React, { useState, useRef, useEffect } from 'react';

const WindowsXPPortfolio = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [dragState, setDragState] = useState({ isDragging: false, dragId: null, offset: { x: 0, y: 0 } });

  const desktopIcons = [
    { id: 'portfolio', name: 'My Portfolio', icon: '📁', content: 'Portfolio Content' },
    { id: 'projects', name: 'Web Projects', icon: '🌐', content: 'My Web Development Projects' },
    { id: 'about', name: 'About Me', icon: '👤', content: 'About Me Information' },
    { id: 'contact', name: 'Contact', icon: '📧', content: 'Contact Information' },
    { id: 'resume', name: 'Resume', icon: '📄', content: 'My Resume' },
    { id: 'skills', name: 'Skills', icon: '⚡', content: 'Technical Skills' }
  ];

  const openWindow = (icon) => {
    const existingWindow = windows.find(w => w.id === icon.id);
    if (existingWindow) {
      setActiveWindow(existingWindow.id);
      return;
    }

    const newWindow = {
      id: icon.id,
      title: icon.name,
      content: icon.content,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 600, height: 400 },
      isMaximized: false,
      isMinimized: false
    };

    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (windowId) => {
    setWindows(windows.filter(w => w.id !== windowId));
    setActiveWindow(null);
  };

  const minimizeWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    setActiveWindow(null);
  };

  const maximizeWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        position: w.isMaximized ? w.position : { x: 0, y: 0 },
        size: w.isMaximized ? w.size : { width: window.innerWidth, height: window.innerHeight - 40 }
      } : w
    ));
  };

  const restoreWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, isMinimized: false } : w
    ));
    setActiveWindow(windowId);
  };

  const handleMouseDown = (e, windowId) => {
    if (e.target.closest('.window-controls')) return;
    
    const window = windows.find(w => w.id === windowId);
    const rect = e.currentTarget.getBoundingClientRect();
    
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

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;

    setWindows(windows.map(w => 
      w.id === dragState.dragId ? {
        ...w,
        position: {
          x: Math.max(0, Math.min(e.clientX - dragState.offset.x, window.innerWidth - w.size.width)),
          y: Math.max(0, Math.min(e.clientY - dragState.offset.y, window.innerHeight - w.size.height - 40))
        }
      } : w
    ));
  };

  const handleMouseUp = () => {
    setDragState({ isDragging: false, dragId: null, offset: { x: 0, y: 0 } });
  };

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState]);

  const getWindowContent = (windowId) => {
    switch(windowId) {
      case 'portfolio':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Welcome to My Portfolio</h2>
            <p className="mb-4">This is a Windows XP-style portfolio showcasing my work and skills.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-3 rounded border">
                <h3 className="font-bold">Frontend</h3>
                <p className="text-sm">React, Vue, Angular</p>
              </div>
              <div className="bg-green-100 p-3 rounded border">
                <h3 className="font-bold">Backend</h3>
                <p className="text-sm">Node.js, Python, PHP</p>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">My Web Projects</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold">E-commerce Platform</h3>
                <p className="text-sm text-gray-600">Built with React and Node.js</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold">Task Management App</h3>
                <p className="text-sm text-gray-600">Vue.js and Express backend</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold">Portfolio Website</h3>
                <p className="text-sm text-gray-600">This Windows XP-style site!</p>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">About Me</h2>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <div>
                <p className="mb-2">Hello! I'm a passionate web developer with experience in modern technologies.</p>
                <p className="mb-2">I love creating user-friendly applications and solving complex problems.</p>
                <p>When I'm not coding, you can find me exploring new technologies or contributing to open source projects.</p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📱</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">🌐</span>
                <span>linkedin.com/in/yourprofile</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <span>Your City, State</span>
              </div>
            </div>
          </div>
        );
      case 'resume':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Resume</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-600">Experience</h3>
                <div className="ml-4 mt-2">
                  <p className="font-semibold">Senior Developer - Tech Company</p>
                  <p className="text-sm text-gray-600">2022 - Present</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-blue-600">Education</h3>
                <div className="ml-4 mt-2">
                  <p className="font-semibold">Computer Science Degree</p>
                  <p className="text-sm text-gray-600">University Name - 2020</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Technical Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">Frontend</h3>
                <div className="space-y-1">
                  <div className="bg-blue-200 rounded px-2 py-1 text-sm">React</div>
                  <div className="bg-green-200 rounded px-2 py-1 text-sm">Vue.js</div>
                  <div className="bg-purple-200 rounded px-2 py-1 text-sm">TypeScript</div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Backend</h3>
                <div className="space-y-1">
                  <div className="bg-yellow-200 rounded px-2 py-1 text-sm">Node.js</div>
                  <div className="bg-red-200 rounded px-2 py-1 text-sm">Python</div>
                  <div className="bg-indigo-200 rounded px-2 py-1 text-sm">PostgreSQL</div>
                </div>
              </div>
            </div>
          </div>
        );
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
          {desktopIcons.map((icon, index) => (
            <div
              key={icon.id}
              className="flex flex-col items-center cursor-pointer group"
              onDoubleClick={() => openWindow(icon)}
            >
              <div className="text-3xl mb-1 group-hover:bg-blue-400 group-hover:bg-opacity-50 rounded p-1">
                {icon.icon}
              </div>
              <span className="text-white text-xs text-center bg-blue-800 bg-opacity-50 px-1 rounded group-hover:bg-blue-700">
                {icon.name}
              </span>
            </div>
          ))}
        </div>

        {/* Windows */}
        {windows.map((window) => (
          !window.isMinimized && (
            <div
              key={window.id}
              className={`absolute bg-gray-200 border-2 border-gray-400 rounded-t-lg shadow-lg ${
                activeWindow === window.id ? 'z-50' : 'z-40'
              }`}
              style={{
                left: window.position.x,
                top: window.position.y,
                width: window.size.width,
                height: window.size.height,
              }}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
            >
              {/* Title Bar */}
              <div className={`h-8 bg-gradient-to-r ${
                activeWindow === window.id 
                  ? 'from-blue-600 to-blue-800' 
                  : 'from-gray-400 to-gray-600'
              } flex items-center justify-between px-2 cursor-move rounded-t-lg`}>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-bold">{window.title}</span>
                </div>
                <div className="flex space-x-1 window-controls">
                  <button
                    onClick={() => minimizeWindow(window.id)}
                    className="w-6 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 text-xs flex items-center justify-center"
                  >
                    _
                  </button>
                  <button
                    onClick={() => maximizeWindow(window.id)}
                    className="w-6 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 text-xs flex items-center justify-center"
                  >
                    □
                  </button>
                  <button
                    onClick={() => closeWindow(window.id)}
                    className="w-6 h-5 bg-red-500 hover:bg-red-600 border border-red-700 text-white text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="h-full bg-white overflow-auto">
                {getWindowContent(window.id)}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Taskbar */}
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
              onClick={() => window.isMinimized ? restoreWindow(window.id) : setActiveWindow(window.id)}
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
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default WindowsXPPortfolio;
