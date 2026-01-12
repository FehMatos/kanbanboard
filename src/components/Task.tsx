import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/kanban";

interface TaskProps {
  task: Task;
  deleteTask: (id: string) => void;
}

function Task({ task, deleteTask }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="task">
      <div className="task-drag-handle" {...listeners} {...attributes}>
        <p>{task.description}</p>
      </div>

      <button
        className="delete-task"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task._id);
        }}
      >
        X
      </button>
    </div>
  );
}

export default Task;
