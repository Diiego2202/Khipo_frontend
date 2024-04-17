import React, { useEffect, useState } from "react";
import NewProjectModal from "./newProjectModal";

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: any[];
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface ProjectListProps {
  onProjectClick: (projectId: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  const [projectInfo, setProjectInfo] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userID = window.location.pathname.split("/").pop();

    const fetchData = async () => {
      try {
        if (!userID) return;

        const [userResponse, projectsResponse] = await Promise.all([
          fetch(`http://localhost:8000/user/${userID}`),
          fetch(`http://localhost:8000/user/${userID}/projects`),
        ]);

        if (!userResponse.ok || !projectsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await userResponse.json();
        const projectData = await projectsResponse.json();

        setUser(userData);
        setProjectInfo(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex flex-col justify-between h-screen p-4">
      <div className="space-y-2">
        <div className="flex mb-4 relative">
          <button
            className="font-semibold text-black rounded hover:bg-gray-300 py-2 px-4 w-full"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user?.name}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-xl z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            )}
          </button>
        </div>
        {projectInfo.map((project) => (
          <button
            key={project.id}
            onClick={() => onProjectClick(project.id)}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-300 bg-gray-200"
          >
            <div className="flex items-center gap-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-medium text-black">{project.name}</span>
            </div>
            <span className="text-white bg-gray-800 px-2 py-1 rounded-md text-xs">
              {project.tasks.length}
            </span>
          </button>
        ))}
      </div>

      <div className="flex">
        <button
          className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black"
          onClick={openModal}
        >
          + Novo Projeto
        </button>
      </div>

      {isModalOpen && <NewProjectModal onClose={closeModal} />}
    </nav>
  );
};

export default ProjectList;
