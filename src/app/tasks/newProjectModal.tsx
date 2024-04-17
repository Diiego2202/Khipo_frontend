import React, { useState } from "react";

interface NewProjectModalProps {
  onClose: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          userID: 5, // Número fixo para o usuário
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Novo Projeto</h2>
        <div className="mb-4">
          <input
            placeholder="Título"
            type="text"
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
