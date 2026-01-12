import { useState, useEffect, useRef } from "react";

interface TaskFormProps {
  columnId: string;
  addTask: (columnId: string, input: { description: string }) => void;
  onClose: () => void;
}

export default function TaskForm({
  columnId,
  addTask,
  onClose,
}: TaskFormProps) {
  const [description, setDescription] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!description.trim()) return;
    addTask(columnId, { description });
    setDescription("");
    onClose();
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          ref={inputRef}
          value={description}
          placeholder="Describe your task"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          className="inputHolder"
        />
        <button type="submit" className="send-btn">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Send</title>

            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Icon-Set-Filled"
                transform="translate(-570.000000, -257.000000)"
                fill="gray"
              >
                <path
                  d="M580.407,278.75 C581.743,281.205 586,289 586,289 C586,289 601.75,258.5 602,258 L602.02,257.91 L580.407,278.75 L580.407,278.75 Z M570,272 C570,272 577.298,276.381 579.345,277.597 L601,257 C598.536,258.194 570,272 570,272 L570,272 Z"
                  id="send-email"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}
