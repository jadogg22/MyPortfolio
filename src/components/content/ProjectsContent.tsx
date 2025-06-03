export const ProjectsContent: React.FC = () => (
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
    </div>
  </div>
);