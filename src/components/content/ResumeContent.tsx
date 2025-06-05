import React from 'react';

export const ResumeContent: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 border-2 border-gray-700 bg-gray-100 shadow-lg rounded-md">
      <div className="p-4 text-sm font-mono bg-white text-black">
        <h2 className="text-xl font-bold mb-2">Sharp Transportation — IT Specialist</h2>
        <p className="mb-2 text-xs text-gray-600">Nov 2023 – Present</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Built a full-stack Go + React web app for revenue and performance stats</li>
          <li>Cut report time by 90%, reduced load time from 6s → sub-second via in-memory caching</li>
          <li>Designed REST APIs using optimized SQL (PostgreSQL & MySQL)</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Samsara/Omnitracs ELD Integration</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Unified legacy Omnitracs + new Samsara logs into Dossier</li>
          <li>Ensured 100% uptime during device transitions</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Invoice Generator</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Created a Go-based backend for Excel invoice generation</li>
          <li>Custom filters/layouts per client; saved hours weekly and prevented contract losses</li>
        </ul> 

        <h2 className="text-xl font-bold mt-6 mb-2">Contact & Links</h2>
        <ul className="ml-5">
          <li>Email: <a className="text-blue-600 underline" href="mailto:jadenanderson22@gmail.com">jadenanderson22@gmail.com</a></li>
          <li>Phone: (435)-770-6846</li>
          <li>GitHub: <a className="text-blue-600 underline" href="https://github.com/jadogg22">github.com/jadogg22</a></li>
        </ul>
      </div>
    </div>
  );
};