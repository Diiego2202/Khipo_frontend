import React, { useEffect, useState } from "react";
import NewProjectModal from "./newProjectModal";
import NewTaskModal from "./newTaskModal";

interface ProjectListProps {
  onProjectClick: (projectId: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  const [projectInfo, setProjectInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
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

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    onProjectClick(projectId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="mt-4 space-y-3 ">
      {projectInfo.map((project) => (
        <button
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
          className="flex items-center justify-between w-60 p-2 text-s font-medium text-black transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <div className="flex items-center gap-x-2 ">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            <span>{project.name}</span>
          </div>
        </button>
      ))}

      {isModalOpen && <NewProjectModal onClose={closeModal} />}
      <button
        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-black"
        onClick={openModal}
      >
        + Novo Projeto
      </button>

      {isTaskModalOpen && (
        <NewTaskModal onClose={closeTaskModal} projectId={selectedProjectId} />
      )}
      <button
        className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 text-black"
        onClick={openTaskModal}
      >
        + Nova Task
      </button>
    </nav>
  );
};

export default ProjectList;
