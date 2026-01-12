import type { Column as ColumnType, Task, AddTaskInput } from "../types/kanban";

export interface ColumnProps {
  column: ColumnType;
  tasks: Task[];

  addTask: (columnId: string, input: AddTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;
  updateColumn: (id: string, newTitle: string) => Promise<void>;
  updateColumnColor: (id: string, color: string) => Promise<void>;
}
