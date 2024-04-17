"use client";

import React from "react";
import ProjectList from "./projectList";

interface SidebarProps {
  onProjectClick: (projectId: number) => void;
}

export default function Sidebar({ onProjectClick }: SidebarProps) {
  return (
    <div className="h-screen w-72 bg-white border-r">
      <ProjectList onProjectClick={onProjectClick} />
    </div>
  );
}
