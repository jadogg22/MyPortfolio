import React, { useState, useRef } from 'react';

interface NotepadProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export const NotepadContent: React.FC<NotepadProps> = ({ onClose }) => {
  const [text, setText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('Untitled');
  const [isModified, setIsModified] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsModified(true);
  };

  const handleNew = () => {
    if (isModified) {
      const shouldDiscard = window.confirm('Do you want to save changes to ' + fileName + '?');
      if (!shouldDiscard) return;
    }
    setText('');
    setFileName('Untitled');
    setIsModified(false);
  };

  const handleSave = () => {
    // In a real app, this would save to a file system
    // For demo purposes, we'll just download as a text file
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName + '.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setIsModified(false);
  };

  const handleOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setText(content);
          setFileName(file.name.replace('.txt', ''));
          setIsModified(false);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const insertDateTime = () => {
    const now = new Date();
    const dateTime = now.toLocaleString();
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.substring(0, start) + dateTime + text.substring(end);
      setText(newText);
      setIsModified(true);
      
      // Move cursor after inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + dateTime.length;
        textarea.focus();
      }, 0);
    }
  };

  const toggleWordWrap = () => {
    if (textareaRef.current) {
      const currentWrap = textareaRef.current.style.whiteSpace;
      textareaRef.current.style.whiteSpace = currentWrap === 'nowrap' ? 'pre-wrap' : 'nowrap';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* Menu Bar */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="flex">
          <div className="relative">
            <button
              className="px-3 py-1 hover:bg-blue-200 text-sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              File
            </button>
            {showMenu && (
              <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg z-10 min-w-32">
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm"
                  onClick={() => { handleNew(); setShowMenu(false); }}
                >
                  New &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ctrl+N
                </button>
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm"
                  onClick={() => { handleOpen(); setShowMenu(false); }}
                >
                  Open... &nbsp;&nbsp;&nbsp;&nbsp; Ctrl+O
                </button>
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm"
                  onClick={() => { handleSave(); setShowMenu(false); }}
                >
                  Save &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ctrl+S
                </button>
                <hr className="my-1" />
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm"
                  onClick={() => { onClose?.(); setShowMenu(false); }}
                >
                  Exit
                </button>
              </div>
            )}
          </div>
          <button className="px-3 py-1 hover:bg-blue-200 text-sm">Edit</button>
          <div className="relative">
            <button className="px-3 py-1 hover:bg-blue-200 text-sm">Format</button>
          </div>
          <button className="px-3 py-1 hover:bg-blue-200 text-sm">View</button>
          <button className="px-3 py-1 hover:bg-blue-200 text-sm">Help</button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1 text-xs text-gray-600">
        {fileName}{isModified ? ' *' : ''} - Notepad
      </div>

      {/* Text Area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="w-full h-full p-2 font-mono text-sm resize-none border-none outline-none bg-white"
          placeholder="Start typing..."
          style={{ 
            fontFamily: 'Consolas, "Courier New", monospace',
            lineHeight: '1.2',
            whiteSpace: 'pre-wrap'
          }}
          onKeyDown={(e) => {
            // Handle keyboard shortcuts
            if (e.ctrlKey) {
              switch (e.key) {
                case 'n':
                  e.preventDefault();
                  handleNew();
                  break;
                case 's':
                  e.preventDefault();
                  handleSave();
                  break;
                case 'o':
                  e.preventDefault();
                  handleOpen();
                  break;
              }
            }
            
            // Insert date/time with F5
            if (e.key === 'F5') {
              e.preventDefault();
              insertDateTime();
            }
          }}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 text-xs text-gray-600 flex justify-between">
        <span>Lines: {text.split('\n').length} | Characters: {text.length}</span>
        <span>100%</span>
      </div>
    </div>
  );
};

