import React from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Satellite Detection Viewer',
    description:
      'This web application visualizes satellite Detected ships in real-time. I personally trained a custom YOLOv8 model to detect ships in satellite imagery. ' +
      'Along with the model, I took over the backend development. I build out logging, data processing, and stabaility improvements. ' +
      'The frontend was built by a team of developers, and I contributed to the UI/UX design and implementation.',
    tech: ['React', 'Tailwind', 'YOLO', 'FastAPI', 'SQLite'],
    github: 'https://github.com/jadogg22/Satellite-Detection',
  },
  {
    title: 'Sharp Transportation Site',
    description:
      'The official marketing site for Sharp Transportation. Fully responsive and optimized for performance. Includes careers, history timeline, and recruitment sections. still in development.',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    link: 'https://sharp-site.vercel.app/',
  },
  {
    title: 'Invoice Generator',
    description:
      'Built a backend pipeline in Go to generate Excel invoices based on order data. Added filters and formatting customization to fit customer-specific needs, reducing hours of manual work.',
    tech: ['Go', 'Excelize', 'MySQL'],
    github: 'https://github.com/jadogg22/invoice-generator',
  },
  {
    title: 'Go-SharpGraphs',
    description:
      'Internal tool for live revenue and performance reporting at a trucking company. Aggregated data from multiple systems and reduced report generation time by 90%.',
    tech: ['Go', 'React', 'PostgreSQL', 'SWR'],
    github: 'https://github.com/jadogg22/go-sharpGraphs',
  },
  {
    title: 'Windows XP Portfolio',
    description:
      'A nostalgic web desktop experience styled after Windows XP. Features draggable windows, a taskbar, and boot-up sounds. Built as a personal showcase for dev skills and personality.',
    tech: ['React', 'Vite', 'Tailwind', 'TypeScript'],
    github: 'https://github.com/jadogg22/windows-xp-portfolio',
  },
];

export const WebProjectsTab: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-[#c0c0c0] p-4 font-[Tahoma] text-sm scrollbar-thin scrollbar-thumb-[#0a246a] scrollbar-track-[#e4e4e4]">
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-800 bg-[#e4e4e4] p-3 rounded-sm shadow-[inset_1px_1px_0px_white,inset_-1px_-1px_0px_#808080]"
          >
            <h2 className="text-md font-bold text-blue-900 underline mb-1">
              {project.title}
            </h2>
            <p className="mb-2 text-gray-900 leading-snug">{project.description}</p>
            <div className="flex flex-wrap gap-1 text-xs text-black mb-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white border border-gray-400 px-1 py-0.5 rounded-sm shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-xs text-blue-800">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline mr-3"
                >
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
