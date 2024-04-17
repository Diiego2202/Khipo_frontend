"use client";

import React, { useState } from "react";

interface EditTaskModalProps {
  task: any;
  onClose: () => void;
  onUpdate: (updatedTask: any) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState<any[]>(task.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput && !tags.some((tag) => tag.title === tagInput)) {
      const newTag = {
        title: tagInput,
        taskID: task.id,
      };
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleSubmit = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      tags,
    };

    onUpdate(updatedTask);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Editar Tarefa</h2>
        <div className="mb-4">
          <input
            placeholder="Título"
            type="text"
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Descrição"
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            placeholder="Adicionar tag"
            className="mr-2 p-2 w-full border rounded-md text-black"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={handleAddTag}
          >
            Adicionar Tag
          </button>
        </div>
        <div className="mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="mr-2 px-3 py-1 bg-gray-200 rounded-full text-sm text-black"
            >
              {tag.title}
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
