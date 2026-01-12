import Task from "./Task";
import TaskForm from "./TaskForm";
import { useState, useRef, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { ColumnProps } from "../types/column";

function Column({
  column,
  addTask,
  deleteColumn,
  updateColumn,
  updateColumnColor,
  tasks,
  deleteTask,
}: ColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showBtns, setShowBtns] = useState(true);
  const [showEditBar, setShowEditBar] = useState(true);
  const [inputValue, setInputValue] = useState<string>(column.title);
  const [columnColor, setColumnColor] = useState<string | undefined>(
    column.color
  );
  const [showColors, setShowColors] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column._id}`,
  });
  const style: React.CSSProperties = {};
  const colorGradients = [
    "linear-gradient(135deg, #FF6B6B, #E55B5B)",
    "linear-gradient(135deg, #FF9F43, #E58A2E)",
    "linear-gradient(135deg, #1DD1A1, #17A589)",
    "linear-gradient(135deg, #54A0FF, #4180C6)",
    "linear-gradient(135deg, #5F27CD, #4B1BA0)",
    "linear-gradient(135deg, #F368E0, #D252C6)",
    "linear-gradient(135deg, #48DBFB, #2C9AB7)",
    "linear-gradient(135deg, #F3A683, #D07C5C)",
    "linear-gradient(135deg, #8395A7, #5A6B7A)",
    "linear-gradient(135deg, #F7DC6F, #D4AC0D)",
  ];

  const handleColorChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    newColor: string
  ): void => {
    setColumnColor(newColor);

    setShowColors(false);
  };

  useEffect(() => {
    if (inputFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputFocus]);

  const handleFormClose = () => {
    setShowForm(false);
    setShowBtn(true);
  };

  const columnTasks = tasks.filter(
    (task) => task.column?.toString() === column._id
  );

  return (
    <>
      <div className="columns" ref={setNodeRef} style={style}>
        <h2 className="title" style={{ background: columnColor }}>
          {showBtns && (
            <p className="columnTitle" style={{ paddingTop: "-10px" }}>
              {column.title}
            </p>
          )}

          <div className="columnBar">
            {showBtns && !showColors && (
              <div className="tooltip-container">
                <span className="tooltip-text">Color</span>{" "}
                <button
                  className="editColor"
                  onClick={() => {
                    setShowColors(true);
                  }}
                >
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    width="14"
                    height="14"
                    transform="scale(1.6)"
                    xmlSpace="preserve"
                    fill={"white"}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect width="512" height="512"></rect>{" "}
                    </g>
                  </svg>
                </button>{" "}
              </div>
            )}

            {showColors && (
              <div className="tooltip-container">
                <span className="tooltip-text">Cancel</span>{" "}
                <button
                  style={{ color: "white" }}
                  onClick={() => {
                    setShowColors(false);
                  }}
                >
                  X
                </button>
              </div>
            )}

            {showInput && (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setShowEditBar(false);
                  setShowBtns(true);
                  setShowInput(false);
                  setShowEditBar(true);
                  setInputFocus(false);
                }}
              >
                {inputFocus && showEditBar && (
                  <input
                    type="text"
                    ref={inputRef}
                    className="editInput"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setInputValue(e.target.value);
                    }}
                  />
                )}
                {showEditBar && (
                  <div className="tooltip-container">
                    <span className="tooltip-text">Send</span>
                    <button
                      className="editBar"
                      style={{
                        backgroundColor: "rgb(55, 158, 35)",
                        color: "white",
                      }}
                      onClick={() => updateColumn(column._id, inputValue)}
                    >
                      ✔
                    </button>
                  </div>
                )}
                {showEditBar && (
                  <div className="tooltip-container">
                    <span className="tooltip-text">Cancel</span>{" "}
                    <button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                      className="editBar"
                    >
                      X
                    </button>
                  </div>
                )}
              </form>
            )}

            {showBtns && (
              <div className="tooltip-container">
                <span className="tooltip-text">Edit</span>{" "}
                <button
                  className="editTitle"
                  onClick={() => {
                    setShowInput(true);
                    setShowBtns(false);
                    setInputFocus(true);
                    setShowColors(false);
                  }}
                >
                  <svg
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    transform="scale(1.7)"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M20.052,3.948a3.234,3.234,0,0,1,0,4.575L18.471,10.1,13.9,5.529l1.581-1.581A3.234,3.234,0,0,1,20.052,3.948ZM8.438,20.138l8.619-8.62L12.482,6.943l-8.62,8.619L3,21Z"></path>
                    </g>
                  </svg>
                </button>
              </div>
            )}
            {showBtns && columnTasks.length === 0 && (
              <div className="tooltip-container">
                <span className="tooltip-text">Delete</span>{" "}
                <button
                  className="delete-column"
                  onClick={() => deleteColumn(column._id)}
                >
                  X
                </button>
              </div>
            )}
            {columnTasks.length > 0 && !showInput && (
              <div className="tooltip-container">
                <span className="tooltip-text">
                  Cannot delete column with active task(s)
                </span>
                <button
                  style={{
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    filter: "grayscale(100%)",
                    opacity: "0.45",
                  }}
                  className="delete-column"
                >
                  X
                </button>
              </div>
            )}

            {showColors && (
              <div className="color-buttons">
                {colorGradients.map((color, index) => (
                  <button
                    key={index}
                    style={{ background: color }}
                    onClick={(e) => {
                      handleColorChange(e, color);
                      updateColumnColor(column._id, color);
                    }}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </h2>

        {tasks
          .filter((task) => task.column?.toString() === column._id)
          .sort((a, b) => a.position - b.position)
          .map((task) => (
            <Task key={task._id} task={task} deleteTask={deleteTask} />
          ))}

        {showForm && (
          <TaskForm
            columnId={column._id}
            addTask={addTask}
            onClose={handleFormClose}
          />
        )}
        {showBtn && (
          <input
            className="newTask"
            placeholder="Create new Task"
            onClick={() => {
              setShowForm(true);
              setShowBtn(false);
            }}
          ></input>
        )}
      </div>
    </>
  );
}

export default Column;
