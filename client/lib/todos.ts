import axios from "axios";
import { getCookie } from "cookies-next/client";
import { title } from "process";

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

  console.log({ response });

  if (response.status !== 200) {
    throw new Error("Failed to fetch todos");
  }

  return response.data;
};

export const createTodo = async ({
  title,
  listId,
}: {
  title: string;
  listId: string;
}) => {
  const response = await axios.post(
    "/todos/createTodo",
    {
      title,
      listId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to create todo");
  }

  console.log({ response });

  return response.data;
};

export const deleteTodo = async ({
  listId,
  todoId,
}: {
  listId: string;
  todoId: string;
}) => {
  const response = await axios.post(
    `/todos/deleteTodo`,
    { listId, todoId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to delete todo");
  }

  return response.data;
};

export const markAsPending = async ({
  listId,
  todoId,
}: {
  listId: string;
  todoId: string;
}) => {
  const response = await axios.put(
    `/todos/markAsPending`,
    { listId, todoId },
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

export const markAsCompleted = async ({
  listId,
  todoId,
}: {
  listId: string;
  todoId: string;
}) => {
  const response = await axios.put(
    `/todos/markAsCompleted`,
    { listId, todoId },
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
