"use client";
import Todo from "@/components/Todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  markAsCompleted,
  markAsPending,
} from "@/lib/todos";
import { useEffect, useState } from "react";

export type ITodo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const handleFetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.todos as ITodo[]);
    } catch (error) {
      console.log({ error });

      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo?.length) return;

    await createTodo({
      title: newTodo,
    });

    setNewTodo("");

    handleFetchTodos();

    return;
  };

  const handleUpdateTodo = async (todo: ITodo) => {
    if (todo.completed) {
      await markAsPending(todo._id);
    } else {
      await markAsCompleted(todo._id);
    }
    handleFetchTodos();
    return;
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    handleFetchTodos();
    return;
  };

  return (
    <div
      className={`relative w-[300px] min-h-[250px] flex flex-col gap-2 ${
        todos?.length > 0 ? "justify-start" : "justify-center"
      } items-center border border-gray-300 shadow-sm rounded-md p-5`}
    >
      {todos.length > 0 ? (
        todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo._id}
            onChange={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))
      ) : (
        <p className="text-gray-500">No todos</p>
      )}

      <input
        onChange={(e) => setNewTodo(e.target.value)}
        id="add-todo"
        type="text"
        className="p-3 mt-auto border border-gray-300 w-full rounded-md"
        placeholder="Enter todo"
        value={newTodo}
      />

      <button
        onClick={handleAddTodo}
        className="w-full flex justify-center items-center cursor-pointer bg-green-300 p-3 rounded-md"
      >
        Add Todo
      </button>
    </div>
  );
}
