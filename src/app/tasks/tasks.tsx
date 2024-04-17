"use client";

import React, { useState } from "react";
import TaskList from "./taskList";
import Sidebar from "./sideBar";

export default function Tasks() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="flex flex-1">
      <Sidebar onProjectClick={handleProjectClick} />
    
      <div className="flex-1 grid grid-cols-3 bg-gray-100 p-16 gap-12 overflow-auto h-screen">
        <div className="">
          <p className="text-black">Pending</p>
          <TaskList status="Pending" projectId={selectedProjectId} />
        </div>

        <div className="">
          <p className="text-black">In Progress</p>
          <TaskList status="InProgress" projectId={selectedProjectId} />
        </div>

        <div className="">
          <p className="text-black">Completed</p>
          <TaskList status="Completed" projectId={selectedProjectId} />
        </div>
      </div>
    </div>
  );
}
