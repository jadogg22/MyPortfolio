export const PortfolioContent: React.FC = () => (
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

