import "../App.css";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import FehFooter from "../components/FehFooter";
import { useAuthContext } from "../hooks/useAuthContext";
import { Column, Task, AddColumnInput, AddTaskInput } from "../types/kanban";

function Home() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchColumns = async () => {
      const response = await fetch("/api/columns", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setColumns(json);
      }
    };
    if (user) {
      fetchColumns();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setTasks(json);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addColumn = async ({
    title,
    position,
  }: AddColumnInput): Promise<void> => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, position }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.error(json.error);
      return;
    }
    setColumns((prev) => [...prev, json]);
  };

  const addTask = async (
    columnId: string,
    { description }: AddTaskInput
  ): Promise<void> => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        description,
        column: columnId,
        position: 0,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      console.error(json.error);
      return;
    }
    setTasks((prev) => [...prev, json]);
  };

  const deleteColumn = async (id: string): Promise<void> => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/columns/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.error(json.error);
      return;
    }

    setColumns((prev) => prev.filter((column) => column._id !== id));
  };

  const deleteTask = async (id: string): Promise<void> => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.error(json.error);
      return;
    }

    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const updateColumn = async (id: string, newTitle: string): Promise<void> => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(`/api/columns/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    const json = await response.json();
    if (!response.ok) {
      console.error(json.error);
      return;
    }
    setColumns((prev) =>
      prev.map((col) => (col._id === id ? { ...col, title: newTitle } : col))
    );
  };

  const updateColumnColor = async (
    id: string,
    color: string
  ): Promise<void> => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const response = await fetch(`/api/columns/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ color }),
    });

    const json = await response.json();
    if (!response.ok) {
      console.error(json.error);
      return;
    }
    setColumns((prev) =>
      prev.map((col) => (col._id === id ? { ...col, color } : col))
    );
  };

  const moveTask = async (
    taskId: string,
    targetColumnId: string
  ): Promise<void> => {
    if (!user) return;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, column: targetColumnId } : task
      )
    );

    const tasksInColumn = tasks.filter(
      (t) => t.column === targetColumnId && t._id !== taskId
    );

    const newPosition = tasksInColumn.length;

    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        column: targetColumnId,
        position: newPosition,
      }),
    });

    if (!response.ok) {
      setTasks((prev) => [...prev]);
    }
  };

  return (
    <>
      <Board
        columns={columns}
        addColumn={addColumn}
        deleteColumn={deleteColumn}
        updateColumn={updateColumn}
        updateColumnColor={updateColumnColor}
        addTask={addTask}
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
      />
      <FehFooter />
    </>
  );
}
export default Home;
