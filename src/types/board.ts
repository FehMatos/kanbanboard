import { Column, Task, AddColumnInput, AddTaskInput } from "./kanban";

export interface BoardProps {
  columns: Column[];
  tasks: Task[];

  addColumn: (input: AddColumnInput) => Promise<void>;
  addTask: (columnId: string, input: AddTaskInput) => Promise<void>;

  updateColumn: (id: string, newTitle: string) => Promise<void>;
  updateColumnColor: (id: string, color: string) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;

  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, targetColumnId: string) => Promise<void>;
}
