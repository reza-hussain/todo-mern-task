import axios from "axios";
import { getCookie } from "cookies-next/client";

const token = getCookie("token");

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const getTodoList = async () => {
  const response = await axios.get("/todoList/getTodoList", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch todos");
  }

  return response.data;
};

export const createTodoList = async (list: { title: string }) => {
  const response = await axios.post("/todoList/createTodoList", list, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to create todo");
  }
  return response.data;
};

export const deleteTodoList = async (id: string) => {
  const response = await axios.delete(`/todoList/deleteTodoList/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete todo");
  }

  return response.data;
};
