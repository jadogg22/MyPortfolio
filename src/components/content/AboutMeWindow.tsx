import React, { useState } from 'react';
import GallerySection from './GallerySection';

const tabs = ['General', 'Developer', 'Personality', 'Gallery', 'Gallery2'] as const;
type Tab = typeof tabs[number];

const galleryItems = [
  { title: 'My Dev Setup', src: '/gallery/dev-setup.jpg' },
  { title: 'GitHub Projects', src: '/gallery/github-projects.png' },
  { title: 'Halo Tournament', src: '/gallery/halo-tournament.jpg' },
  { title: 'Photography Work', src: '/gallery/photography.jpg' },
  { title: 'Linux Desktop', src: '/gallery/linux-desktop.png' },
  { title: 'Car Collection', src: '/gallery/car-collection.jpg' },
];

export const AboutMeWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('General');

  return (
    <div className="w-full h-full flex flex-col font-sans text-sm bg-gray-200" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Tab bar with classic XP styling */}
      <div className="flex bg-gray-200 border-b border-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-r border-gray-400 text-xs font-normal ${
              activeTab === tab 
                ? 'bg-white border-t border-l border-gray-400 -mb-px' 
                : 'bg-gray-200 hover:bg-gray-100'
            }`}
            style={{
              borderTop: activeTab === tab ? '1px solid #999' : 'none',
              borderLeft: activeTab === tab ? '1px solid #999' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content with classic styling */}
      <div className="p-4 bg-white h-full overflow-auto text-black" style={{ lineHeight: '1.4' }}>
        {activeTab === 'General' && (
          <div className="space-y-3">
            <div className="border border-gray-400 bg-blue-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h2 className="font-bold text-base mb-2" style={{ color: '#000080' }}>Jaden Anderson</h2>
              <p className="text-sm">Aspiring Software Engineer | Backend Specialist</p>
            </div>
            
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="font-bold py-1 pr-3 align-top" style={{ color: '#000080' }}>Current Focus:</td>
                  <td className="py-1">Looking for Junior SWE or Backend Developer positions</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 pr-3 align-top" style={{ color: '#000080' }}>Languages:</td>
                  <td className="py-1">Go, Rust, Python, TypeScript</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 pr-3 align-top" style={{ color: '#000080' }}>Frameworks:</td>
                  <td className="py-1">React, Gin, FastAPI, Django, Next.js</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 pr-3 align-top" style={{ color: '#000080' }}>Specialties:</td>
                  <td className="py-1">Backend development, systems design, performance optimization</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 pr-3 align-top" style={{ color: '#000080' }}>Contact:</td>
                  <td className="py-1">
                    <a href="mailto:jadenanderson22@gmail.com" className="text-blue-600 hover:underline">JadenAnderson22@gmail.com</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="border border-gray-400 bg-yellow-50 p-3 mt-4" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <p className="text-sm">
                <strong>tl;dr:</strong> I build fast, clean backends and actually enjoy debugging. 
                Also pretty good at video games apparently.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Developer' && (
          <div className="space-y-4">
            <div className="border border-gray-400 bg-green-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h3 className="font-bold mb-2" style={{ color: '#006600' }}>What I Do</h3>
              <p className="text-sm mb-2">
                Backend development is where I thrive. Give me an API to optimize, a database to tune, 
                or a system to architect and I'm in my element.
              </p>
              <p className="text-sm">
                I can do frontend work (obviously, since you're looking at this), but my real passion 
                is making servers go fast and data flow efficiently.
              </p>
            </div>

            <div className="border border-gray-400 bg-white p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h4 className="font-bold mb-2" style={{ color: '#000080' }}>Skills & Technologies</h4>
              <ul className="text-sm space-y-1">
                <li>• Algorithm optimization and code refactoring</li>
                <li>• Database design with PostgreSQL, MySQL, SQLite</li>
                <li>• API development and performance tuning</li>
                <li>• System architecture and data pipeline management</li>
                <li>• Linux administration and CLI tooling</li>
              </ul>
            </div>

            <div className="border border-gray-400 bg-blue-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h4 className="font-bold mb-2" style={{ color: '#000080' }}>Recent Projects</h4>
              <p className="text-sm">
                Built a satellite detection tool, revenue tracking dashboard, and automated invoice generator. 
                These weren't just portfolio pieces - they solved real problems and saved actual time and money.
              </p>
              <p className="text-sm mt-2">
                <em>Want to hear more about any of these? Just ask!</em>
              </p>
            </div>

            <div className="border border-gray-400 bg-yellow-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <p className="text-sm">
                <strong>Philosophy:</strong> Code should be clean, performant, and solve real problems. 
                If it doesn't make someone's life easier, why are we building it?
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Personality' && (
          <div className="space-y-4">
            <div className="border border-gray-400 bg-purple-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h3 className="font-bold mb-2" style={{ color: '#800080' }}>Beyond the Code</h3>
              <p className="text-sm">
                I'm the type of person who'll spend 3 hours making something to save 5 minutes. Work hard, laugh often, build cool stuff.
              </p>
            </div>

            <div className="border border-gray-400 bg-white p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h4 className="font-bold mb-2" style={{ color: '#000080' }}>What I'm Into</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-bold py-1 pr-3 align-top">Music:</td>
                    <td className="py-1">Hip hop & R&B, always have something playing while coding</td>
                  </tr>
          
                  <tr>
                    <td className="font-bold py-1 pr-3 align-top">Gaming:</td>
                    <td className="py-1">Competitive Halo (ranked 4th nationally), retro gaming</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-1 pr-3 align-top">IRL:</td>
                    <td className="py-1">Photography, cars, hanging out with actual humans</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-gray-400 bg-red-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h4 className="font-bold mb-2" style={{ color: '#800000' }}>Nostalgia Corner</h4>
              <p className="text-sm">
                There's something beautiful about Windows XP, dial-up sounds, and when websites looked like 
                actual documents. I miss the time where, due to hardware constraints, you needed to optimize everything.
                This whole portfolio is basically me being nostalgic for an era of 
                computing that I grew up with. It was a simple time when the internet was more about
                discovery and less about algorithms and ads.
              </p>
            </div>

            <div className="border border-gray-400 bg-green-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <p className="text-sm">
                <strong>Fun fact:</strong> I don't actually love frontend development, but building this 
                retro-styled portfolio has been surprisingly enjoyable. Sometimes the best projects are 
                the weird ones.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Gallery' && (
          <div className="space-y-4">
            <div className="border border-gray-400 bg-blue-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <h3 className="font-bold mb-2" style={{ color: '#000080' }}>Image Gallery</h3>
              <p className="text-sm">Coming soon... need to actually take some pictures first!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                'My Dev Setup',
                'GitHub Projects', 
                'Halo Tournament',
                'Photography Work',
                'Linux Desktop',
                'Car Collection'
              ].map((title, index) => (
                <div 
                  key={index} 
                  className="border border-gray-400 bg-gray-100 h-24 flex items-center justify-center text-gray-600 text-xs hover:bg-gray-200 cursor-pointer"
                  style={{ borderStyle: 'inset', borderWidth: '2px' }}
                >
                  <div className="text-center">
                    <div className="mb-1">📷</div>
                    <div>{title}</div>
                    <div className="text-xs mt-1">[placeholder]</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-gray-400 bg-yellow-50 p-3" style={{ borderStyle: 'inset', borderWidth: '2px' }}>
              <p className="text-sm">
                <em>Note: This gallery will eventually contain screenshots of projects, photos from tournaments, 
                and probably way too many pictures of my Linux desktop configurations.</em>
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Gallery2' && (
          <GallerySection />
        )}

        { /* Placeholder for new tabs */}

      </div>
    </div>  
  );
};