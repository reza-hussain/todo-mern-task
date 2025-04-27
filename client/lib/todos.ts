import axios from "axios";
import { getCookie } from "cookies-next/client";

const token = getCookie("token");

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const getTodos = async () => {
  const response = await axios.get("/todos/getTodos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch todos");
  }

  return response.data;
};

export const createTodo = async (todo: { title: string }) => {
  const response = await axios.post("/todos/createTodo", todo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to create todo");
  }

  console.log({ response });

  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`/todos/deleteTodo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete todo");
  }

  return response.data;
};

export const markAsPending = async (id: string) => {
  const response = await axios.put(
    `/todos/markAsPending/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to mark todo as pending");
  }

  return response.data;
};

export const markAsCompleted = async (id: string) => {
  const response = await axios.put(
    `/todos/markAsCompleted/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to mark todo as pending");
  }

  return response.data;
};
