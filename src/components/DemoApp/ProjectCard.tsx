import { Project } from "./types";

interface ProjectCardProps {
  item: Project;
  onClick: () => void;
}

const ProjectCard = ({ item, onClick }: ProjectCardProps) => (
  <div className="relative rounded-lg border border-gray-600 bg-gray-800 p-4 text-white shadow transition hover:shadow-lg">
    <button className="absolute right-4 top-4 text-gray-400 transition hover:text-white" onClick={() => onClick()}>
      💬
    </button>
    <h2 className="mb-2 text-xl font-bold">{item.name}</h2>
    <p className="text-gray-300">{item.location}</p>
    <div className="mt-4 justify-between text-sm text-gray-400">
      <span className="mr-8">👥 {item.workers}</span>
      <span className="mr-8">💰 ${item.total}</span>
      <span className="mr-8">⏳ {item.estimate}h</span>
    </div>
  </div>
);

export default ProjectCard;
