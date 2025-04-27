"use client";
import Todo from "@/components/Todo";
import { createTodoList, deleteTodoList, getTodoList } from "@/lib/todoList";
import {
  createTodo,
  deleteTodo,
  markAsCompleted,
  markAsPending,
} from "@/lib/todos";
import { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";

export type ITodoList = {
  name: string;
  items: ITodo[];
  _id: string;
};

export type ITodo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [newList, setNewList] = useState("");
  const [selectedItem, setSelectedItem] = useState<ITodoList>(todoList[0]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    handleFetchList();

    // eslint-disable-next-line
  }, []);

  const handleFetchList = async () => {
    try {
      const response = await getTodoList();

      console.log({ response });

      setTodoList(response.todoList as ITodoList[]);

      if (selectedItem) {
        setSelectedItem((prev) =>
          response.todoList.find((item: ITodoList) => item._id === prev._id)
        );
      }
    } catch (error) {
      console.log({ error });

      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo?.length) return;

    await createTodo({
      title: newTodo,
      listId: selectedItem._id,
    });

    setNewTodo("");
    handleFetchList();

    return;
  };

  const handleUpdateTodo = async (todo: ITodo) => {
    if (todo.completed) {
      await markAsPending({ listId: selectedItem._id, todoId: todo._id });
    } else {
      await markAsCompleted({ listId: selectedItem._id, todoId: todo._id });
    }
    handleFetchList();
    return;
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo({
      listId: selectedItem._id,
      todoId: id,
    });
    handleFetchList();
    return;
  };

  const handleAddList = async () => {
    if (!newList?.length) return;
    await createTodoList({
      title: newList,
    });
    setNewList("");
    handleFetchList();
    return;
  };

  const handleDeleteList = async (id: string) => {
    await deleteTodoList(id);

    handleFetchList();
    return;
  };

  const handleItemClick = async (item: ITodoList) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex h-screen w-full flex-col-reverse md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-100 border-r border-gray-300 p-4 h-[300px] md:h-full flex flex-col justify-start items-center">
        <h2 className="text-lg font-bold mb-4">Todo Lists</h2>
        <ul className="w-full max-w-full flex md:flex-col md:justify-start items-center gap-3 overflow-auto">
          {todoList?.length > 0 ? (
            todoList.map((item) => (
              <li
                key={item._id}
                className="w-[200px] min-w-[200px] max-w-[200px] md:max-w-[unset] md:w-full h-[70px] p-4 bg-white rounded-sm shadow cursor-pointer hover:bg-blue-100 flex justify-between ic"
                onClick={() => handleItemClick(item)}
              >
                <p>{item.name}</p>
                <LuTrash2
                  onClick={() => handleDeleteList(item._id)}
                  size={20}
                  className="stroke-red-500 ml-auto cursor-pointer"
                />
              </li>
            ))
          ) : (
            <p>You don&apos;t have any todo lists</p>
          )}
        </ul>

        <div className="w-full flex flex-col justify-start items-center mt-auto gap-3">
          <input
            onChange={(e) => setNewList(e.target.value)}
            type="text"
            placeholder="Create todo list"
            className="bg-white p-4 rounded-sm w-full"
            value={newList}
          />
          <button
            onClick={handleAddList}
            className="w-full p-3 bg-black text-white cursor-pointer rounded-sm"
          >
            Create List
          </button>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="flex-1 p-4 h-full">
        <h2 className="text-lg font-bold mb-4">Details</h2>
        {selectedItem ? (
          <div className="p-4 bg-white rounded-md shadow h-full max-h-[calc(100%-40px)]">
            <div
              className={`flex flex-col h-full gap-2 max-w-[500px] mx-auto ${
                selectedItem?.items?.length > 0
                  ? "justify-start"
                  : "justify-center"
              } items-center p-5`}
            >
              {selectedItem?.items.length > 0 ? (
                selectedItem?.items?.map((todo) => (
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
                className="w-full flex justify-center items-center cursor-pointer bg-black text-white p-3 rounded-md"
              >
                Add Todo
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">
            Select an item from the sidebar to view details.
          </p>
        )}
      </div>
    </div>
  );
}
