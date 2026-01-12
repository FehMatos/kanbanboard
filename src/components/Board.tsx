import Column from "./Column";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import type { BoardProps } from "../types/board";

export default function Board({
  addTask,
  addColumn,
  updateColumn,
  deleteColumn,
  tasks,
  columns,
  updateColumnColor,
  deleteTask,
  moveTask,
}: BoardProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [activeTask, setActiveTask] = useState<UniqueIdentifier | null>(null);

  function handleDragEnd({ active, over }: DragEndEvent): void {
    if (!over) return;

    const taskId = active.id.toString();
    let targetColumnId: string | null = null;
    const overId = over.id.toString();

    if (overId.startsWith("column-")) {
      targetColumnId = overId.replace("column-", "");
    } else {
      const targetTask = tasks.find((task) => task._id.toString() === overId);

      if (!targetTask) return;

      targetColumnId = targetTask.column.toString();
    }

    if (!targetColumnId) return;
    moveTask(taskId, targetColumnId);
  }

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          setActiveTask(event.active.id);
        }}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveTask(null);
        }}
        onDragCancel={() => setActiveTask(null)}
      >
        <div className="board">
          {columns.map((column) => (
            <Column
              key={column._id}
              column={column}
              addTask={addTask}
              deleteColumn={deleteColumn}
              tasks={tasks}
              updateColumn={updateColumn}
              updateColumnColor={updateColumnColor}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DndContext>{" "}
      <form
        className="newColumn"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addColumn({ title: inputValue, position: columns.length });
          setInputValue("");
        }}
      >
        <input
          placeholder="Create new column"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <button type="submit">
          <svg
            viewBox="0 0 24 24"
            width="70"
            height="auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M5 12H19"
                stroke="#323232"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M12 5L12 19"
                stroke="#323232"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </form>
    </>
  );
}
