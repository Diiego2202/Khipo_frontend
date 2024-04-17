import React, { useState } from "react";

interface Tag {
  title: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
  status: "Pending" | "InProgress" | "Completed";
}

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [tags, setTags] = useState<Tag[]>(task.tags || []);
  const [status, setStatus] = useState<"Pending" | "InProgress" | "Completed">(
    task.status
  );
  const [tagInput, setTagInput] = useState<string>("");
  const [removedTags, setRemovedTags] = useState<Tag[]>([]);

  const handleAddTag = () => {
    if (tagInput && !tags.some((tag) => tag.title === tagInput)) {
      setTags([...tags, { title: tagInput }]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: Tag) => {
    setTags(tags.filter((tag) => tag.title !== tagToDelete.title));
    setRemovedTags([...removedTags, tagToDelete]);
  };

  const handleSubmit = async () => {
    const updatedTask = {
      id: task.id,
      title,
      description,
      status,
      addTags: tags
        .filter(
          (tag) =>
            !task.tags.some((existingTag) => existingTag.title === tag.title)
        )
        .map((tag) => tag.title),
      removeTags: removedTags.map((tag) => tag.title),
    };

    try {
      const response = await fetch(`http://localhost:8000/task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa");
      }

      const updatedTaskData = await response.json();
      onUpdate(updatedTaskData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Editar Tarefa</h2>
        <div className="mb-4">
          <input
            placeholder="Título"
            type="text"
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={status === "Completed"}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Descrição"
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={status === "Completed"}
          />
        </div>
        <div className="mb-4">
          <select
            className="mt-1 p-2 w-full border rounded-md text-black"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "Pending" | "InProgress" | "Completed"
              )
            }
            disabled={task.status === "Completed"}
          >
            <option value="Pending">Pendente</option>
            <option value="InProgress">Em progresso</option>
            <option value="Completed">Feito</option>
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <input
            placeholder="Adicionar tag"
            className="mr-2 p-2 w-full border rounded-md text-black"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            disabled={status === "Completed"}
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg whitespace-nowrap hover:bg-blue-600"
            onClick={handleAddTag}
            disabled={status === "Completed"}
          >
            + Tag
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm text-black cursor-pointer"
              onClick={() => handleDeleteTag(tag)}
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

export default EditTaskModal;
