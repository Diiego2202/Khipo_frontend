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
      <nav className="mt-4 space-y-3">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleOpenEditModal(task)}
              className="w-full rounded-md bg-white"
            >
              <div className="border border-gray-300 p-6 rounded-lg shadow text-start">
                <h2 className="text-xl text-gray-900 font-semibold mb-2">
                  {task.title}
                </h2>
                <p className="mb-2 text-gray-500">
                  {formattedDate(task.date_creation)} - Autor
                </p>
                <p className="leading-relaxed text-gray-500">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags &&
                    task.tags.length > 0 &&
                    task.tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-200 rounded-md text-sm text-black"
                      >
                        {tag.title}
                      </span>
                    ))}
                </div>
              </div>
            </button>
          ))
        ) : (
          <p></p>
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
