export interface AddColumnInput {
  title: string;
  position: number;
}

export interface AddTaskInput {
  description: string;
}
export interface Column {
  _id: string;
  title: string;
  position: number;
  color?: string;
}

export interface Task {
  _id: string;
  description: string;
  column: string;
  position: number;
}
