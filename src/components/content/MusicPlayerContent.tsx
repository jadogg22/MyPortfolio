import React, { useState } from 'react';

export const MusicPlayerContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full bg-[#c0c0c0] text-center font-[Tahoma] text-sm relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e4e4e4] border border-gray-600 z-10">
          <span className="text-blue-900 mb-2">🎵 Loading Spotify Player…</span>
          <div className="w-6 h-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src="https://open.spotify.com/embed/playlist/1YIe34rcmLjCYpY9wJoM2p?utm_source=generator"
        width="100%"
        height="100%"
        className="rounded-none"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
    </div>
  );
};
