import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post("/users/register", {
    email,
    password,
  });

  if (response.status === 200) {
    return response.data;
  }

  throw new Error("Failed to register");
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("users/login", { email, password });

  if (!(response.status === 200)) {
    throw new Error("Failed to login");
  }

  return response.data;
};
