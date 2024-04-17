"use client";

import React, { useEffect, useState } from "react";
import { DateTimeFormatOptions } from "intl";
import EditTaskModal from "./editTaskModal";

interface TaskListProps {
  status?: string;
  projectId?: number | null;
}

const TaskList: React.FC<TaskListProps> = ({ status, projectId }) => {
  const [taskInfo, setTaskInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/project/${projectId}/tasks`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setTaskInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (projectId !== null) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  const formattedDate = (dateString: string) => {
    const options: DateTimeFormatOptions = { day: "2-digit", month: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleOpenEditModal = (task: any) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: any) => {
    console.log("Tarefa atualizada:", updatedTask);
    setIsEditModalOpen(false);
  };

  const filteredTasks = status
    ? taskInfo.filter((task) => task.status === status)
    : taskInfo;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav className="mt-4 space-y-3 ">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleOpenEditModal(task)}
              className="w-full p-1 text-s font-medium text-black transform rounded-md bg-white"
            >
              <div className="p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    {task.title}
                  </h2>
                  <h6>{formattedDate(task.date_creation)} - Autor</h6>
                  <p className="leading-relaxed text-base text-black">
                    {task.description}
                  </p>
                  <div className="flex mt-2">
                    {task.tags &&
                      task.tags.length > 0 &&
                      task.tags.map((tag: any) => (
                        <span
                          key={tag.id} // Usar o id da tag como chave única
                          className="mr-2 px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                          {tag.title}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-black">No tasks available</p>
        )}
      </nav>

      {isEditModalOpen && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
