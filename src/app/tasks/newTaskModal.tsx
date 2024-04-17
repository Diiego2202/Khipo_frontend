import React, { useState } from "react";

interface NewTaskModalProps {
  onClose: () => void;
  projectId: number | null;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ onClose, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!projectId) {
        console.error("No project selected");
        return;
      }

      const response = await fetch("http://localhost:8000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status: "Pending",
          projectID: projectId,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 w-96 border border-gray-300 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Criar Task</h2>
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
          <textarea
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
            className="px-4 py-2 text-white bg-blue-500 rounded-lg whitespace-nowrap hover:bg-blue-600"
            onClick={handleAddTag}
          >
            + Tag
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm text-black"
            >
              {tag}
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
            className="px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
