"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";
import { useEffect, useState } from "react";
import { AddTodo, DeleteTodo, GetTodos, UpdateTodo } from "@/app/api";
import { Loader, Pencil } from "lucide-react";

interface IconProps {
  className?: string;
}

interface DecodedToken {
  userName?: string;
  userId?: string;
}

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodosData {
  todos: Todo[];
  totalCompletedTasks: number;
}

interface FormData {
  title: string;
}

export function TodoLists() {
  const [userData, setUserData] = useState<any>({
    userName: "",
    userId: "",
  });
  const [todosData, setTodosData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const cookieValue: string | undefined = Cookies.get("token");
  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {
    if (cookieValue) {
      const decoded: DecodedToken = decodeJwt(cookieValue);
      setUserData({
        userName: decoded.userName,
        userId: decoded.userId,
      });
    }
  }, [cookieValue]);

  const fetchData = async (userData: any) => {
    setIsDataLoading(true);
    try {
      const data = await GetTodos(userData?.userId);
      setTodosData(data);
      setIsDataLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: any = await AddTodo(formData);
      if (response) {
        setIsLoading(false);
        setFormData({
          title: "",
        });
        fetchData(userData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      await DeleteTodo(todoId);
      setTodosData((prevData: TodosData) => ({
        ...prevData,
        todos: prevData.todos.filter((todo: Todo) => todo._id !== todoId),
      }));
      fetchData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (todoId: string, data: any) => {
    try {
      const response: any = await UpdateTodo(todoId, { completed: data });
      if (response) {
        await fetchData(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(userData);
  }, [userData]);

  return (
    <div className="mt-[7rem] flex flex-col dark:bg-transparent">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 text-center  text-gray-900 dark:text-gray-100">
          <h1 className="text-3xl font-bold">Hi, {userData?.userName}</h1>
          <p> Here&apos;s your todo list</p>
        </div>

        <div className="w-full flex items-center justify-between mb-3 overflow-hidden">
          <span className="text-gray-900 dark:text-gray-50 font-medium">
            Tasks Completed
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {todosData?.totalCompletedTasks || 0} of{" "}
              {todosData?.todos?.length}
            </span>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
              <div
                className="h-2 bg-gray-900 dark:bg-gray-50 rounded-full"
                style={{
                  width: `${
                    ((todosData?.totalCompletedTasks || 0) /
                      (todosData?.todos?.length || 1)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="min-w-[360px]   max-w-[470px]  mx-auto space-y-4 overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm px-4 py-3"
          >
            <input
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Add a new todo..."
              type="text"
              value={formData.title}
              name="title"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {isLoading ? (
                <Loader className=" h-4 w-4 animate-spin" />
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
            </button>
          </form>

          {todosData?.todos?.length === 0 ? (
            <div className="flex items-center justify-center w-full">
              <p className="text-gray-500 dark:text-gray-400">
                You don&apos;t have any todos
              </p>
            </div>
          ) : (
            <div className="w-full space-y-1">
              {todosData?.todos?.map((todo: any) => (
                <div
                  key={todo._id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <div className="flex items-center px-4 py-3">
                    <Checkbox
                      onClick={() => handleUpdate(todo._id, !todo.completed)}
                      defaultChecked={todo.completed}
                      id={`todo-${todo._id}`}
                    />
                    <label
                      htmlFor={`todo-${todo._id}`}
                      className="flex-1 ml-4 text-gray-900 dark:text-gray-100"
                    >
                      {todo.title}
                    </label>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      {/* <button className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PlusIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
