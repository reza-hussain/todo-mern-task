import { ITodo } from "@/app/page";
import React, { useState } from "react";
import { LuCheck, LuTrash2 } from "react-icons/lu";

const Todo = ({
  todo,
  onChange,
  onDelete,
}: {
  todo: ITodo;
  onChange: (todo: ITodo) => void;
  onDelete: (id: string) => void;
}) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleCheck = async () => {
    setIsChecked(!isChecked);
    onChange(todo);
  };

  return (
    <div
      className={`w-full flex justify-start items-center gap-2 border border-gray-300 rounded-md p-5 ${
        isChecked ? "opacity-40" : ""
      }`}
    >
      <button
        onClick={handleCheck}
        className={`w-5 h-5 flex justify-center items-center rounded-sm cursor-pointer ${
          isChecked
            ? "bg-green-600  border-green-200"
            : "bg-white border-gray-200"
        } border `}
      >
        {isChecked && <LuCheck size={12} stroke="white" />}
      </button>

      <p>{todo.title}</p>

      <LuTrash2
        onClick={() => onDelete(todo._id)}
        size={20}
        className="stroke-red-500 ml-auto cursor-pointer"
      />
    </div>
  );
};

export default Todo;
