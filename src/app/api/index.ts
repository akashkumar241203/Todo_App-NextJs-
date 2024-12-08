import axios from "axios";

// Register a new user
export const Register = async (data: any) => {
  const response = await axios.post("/api/auth/register", data);
  return response.data;
};

// login a user
export const Login = async (data: any) => {
  const response = await axios.post("/api/auth/login", data);
  return response.data;
};

// Add a new todo
export const AddTodo = async (data: any) => {
  const response = await axios.post("/api/todos/add", data);
  return response.data;
};

// Get todo lists
export const GetTodos = async (userId: string) => {
  const response = await axios.get(`/api/todos/get/${userId}`);
  return response.data;
};

// Delete a todo
export const DeleteTodo = async (todoId: string) => {
  const response = await axios.delete(`/api/todos/delete/${todoId}`);
  return response.data;
};


// Update a todo
export const UpdateTodo = async (todoId: string, data: any) => {
  const response = await axios.put(`/api/todos/update/${todoId}`, data);
  return response.data;
}