import { useState } from 'react';

const galleryItems = [
  { title: 'My Dev Setup', src: '/gallery/dev-setup.jpg' },
  { title: 'GitHub Projects', src: '/gallery/github-projects.png' },
  { title: 'Halo Tournament', src: '/gallery/halo-tournament.jpg' },
  { title: 'Photography Work', src: '/gallery/photography.jpg' },
  { title: 'Linux Desktop', src: '/gallery/linux-desktop.png' },
  { title: 'Car Collection', src: '/gallery/car-collection.jpg' },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="border border-gray-400 bg-blue-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
        <h3 className="font-bold mb-2" style={{ color: '#000080' }}>Image Gallery</h3>
        <p className="text-sm">Click on any thumbnail to view in Windows Picture and Fax Viewer</p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {galleryItems.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-400 bg-gray-100 h-20 flex items-center justify-center text-gray-600 text-xs hover:bg-gray-200 cursor-pointer"
            style={{ borderStyle: 'inset', borderWidth: '2px' }}
            onClick={() => setSelectedImage(index)}
          >
            <div className="text-center">
              <div className="mb-1">🖼️</div>
              <div className="text-xs">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Windows Picture and Fax Viewer Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 border border-gray-400 max-w-4xl max-h-5/6 flex flex-col" style={{ borderStyle: 'outset', borderWidth: '2px' }}>
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="mr-2">🖼️</span>
                <span>{galleryItems[selectedImage].title} - Windows Picture and Fax Viewer</span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-0 text-xs border border-gray-400" style={{ borderStyle: 'outset', borderWidth: '1px' }}>_</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-0 text-xs border border-gray-400" style={{ borderStyle: 'outset', borderWidth: '1px' }}>□</button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-0 text-xs border border-gray-400" 
                  style={{ borderStyle: 'outset', borderWidth: '1px' }}
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Menu Bar */}
            <div className="bg-gray-200 border-b border-gray-400 px-2 py-1 text-xs">
              <span className="hover:bg-blue-100 px-2 py-1 cursor-pointer">File</span>
              <span className="hover:bg-blue-100 px-2 py-1 cursor-pointer">Edit</span>
              <span className="hover:bg-blue-100 px-2 py-1 cursor-pointer">View</span>
              <span className="hover:bg-blue-100 px-2 py-1 cursor-pointer">Tools</span>
              <span className="hover:bg-blue-100 px-2 py-1 cursor-pointer">Help</span>
            </div>
            
            {/* Toolbar */}
            <div className="bg-gray-200 border-b border-gray-400 px-2 py-1 flex items-center space-x-2 text-xs">
              <button 
                className="bg-gray-300 hover:bg-gray-400 px-2 py-1 border border-gray-400" 
                style={{ borderStyle: 'outset', borderWidth: '1px' }}
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryItems.length - 1)}
              >
                ◀
              </button>
              <button 
                className="bg-gray-300 hover:bg-gray-400 px-2 py-1 border border-gray-400" 
                style={{ borderStyle: 'outset', borderWidth: '1px' }}
                onClick={() => setSelectedImage(selectedImage < galleryItems.length - 1 ? selectedImage + 1 : 0)}
              >
                ▶
              </button>
              <div className="border-l border-gray-400 h-4 mx-2"></div>
              <button className="bg-gray-300 hover:bg-gray-400 px-2 py-1 border border-gray-400" style={{ borderStyle: 'outset', borderWidth: '1px' }}>🔍+</button>
              <button className="bg-gray-300 hover:bg-gray-400 px-2 py-1 border border-gray-400" style={{ borderStyle: 'outset', borderWidth: '1px' }}>🔍-</button>
              <button className="bg-gray-300 hover:bg-gray-400 px-2 py-1 border border-gray-400" style={{ borderStyle: 'outset', borderWidth: '1px' }}>🖨️</button>
            </div>
            
            {/* Image Area */}
            <div className="bg-white p-4 flex-1 flex items-center justify-center min-h-96">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🖼️</div>
                <div className="text-lg mb-2">{galleryItems[selectedImage].title}</div>
                <div className="text-sm">Image would be displayed here</div>
                <div className="text-xs mt-4 text-gray-400 bg-gray-100 p-2 rounded border">
                  File: {galleryItems[selectedImage].src}
                </div>
                <div className="text-xs mt-2 text-blue-600">
                  Click the arrows above to navigate between images
                </div>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
              <div>Ready</div>
              <div>{selectedImage + 1} of {galleryItems.length}</div>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-400 bg-yellow-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
        <p className="text-sm">
          <em>Note: Images are placeholders for now. The viewer experience is authentic Windows XP though! Try clicking the navigation arrows.</em>
        </p>
      </div>
    </div>
  );
}
