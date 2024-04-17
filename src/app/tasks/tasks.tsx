"use client";

import React, { useState } from "react";
import TaskList from "./taskList";
import Sidebar from "./sideBar";
import NewTaskModal from "./newTaskModal";

export default function Tasks() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <div className="flex flex-1">
      <Sidebar onProjectClick={handleProjectClick} />
      <div className="flex-1 flex flex-col bg-gray-100 overflow-auto h-screen">
        <div className="flex px-16 pt-8 justify-end w-full">
          {isTaskModalOpen && (
            <NewTaskModal
              onClose={closeTaskModal}
              projectId={selectedProjectId}
            />
          )}
          <button
            className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 text-black"
            onClick={openTaskModal}
          >
            + Nova Task
          </button>
        </div>
        <div className="grid grid-cols-3 p-16 gap-12">
          <div className="">
            <p className="font-medium text-black">Pendente</p>
            <TaskList status="Pending" projectId={selectedProjectId} />
          </div>

          <div className="">
            <p className="font-medium text-black">Em progresso</p>
            <TaskList status="InProgress" projectId={selectedProjectId} />
          </div>

          <div className="">
            <p className="font-medium text-black">Feito</p>
            <TaskList status="Completed" projectId={selectedProjectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
