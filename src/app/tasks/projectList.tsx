import React, { useEffect, useState } from "react";
import NewProjectModal from "./newProjectModal";

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: any[];
}

interface ProjectListProps {
  onProjectClick: (projectId: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  const [projectInfo, setProjectInfo] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/5/projects");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProjectInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    onProjectClick(projectId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex flex-col justify-between h-screen p-4">
      <div className="space-y-2">
        {projectInfo.map((project) => (
          <button
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="flex items-center justify-between w-60 p-2 rounded-lg hover:bg-gray-300 bg-gray-200"
          >
            <div className="flex items-center justify-between gap-x-2 w-full">
              <div className="flex items-center gap-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium text-black ">{project.name}</span>
              </div>
              <span className="text-white bg-gray-800 px-2 py-1 rounded-md text-xs">
                {project.tasks.length}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex">
        {isModalOpen && <NewProjectModal onClose={closeModal} />}
        <button
          className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black"
          onClick={openModal}
        >
          + Novo Projeto
        </button>
      </div>
    </nav>
  );
};

export default ProjectList;
