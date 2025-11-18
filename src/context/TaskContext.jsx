import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const URL = "https://taskappbackend-9sbt.onrender.com/task";
  const headers = { "Content-Type": "application/json" };
  const date = new Date();

  const completed = async (id, taskState) => {
    const raw = JSON.stringify({ completed: taskState });
    const data = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: raw,
    });

    const response = await data.json();

    taskState == "true"
      ? toast.success("¡Genial! Una tarea menos para ti")
      : toast(`La tarea se marcó como pendiente`);

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...response } : task))
    );
  };

  const newTask = async (name, description) => {
    const raw = JSON.stringify({
      name: name,
      description: description,
      date:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      completed: "false",
    });
    const data = await fetch(URL, {
      method: "POST",
      headers,
      body: raw,
    });

    const response = await data.json();

    toast.success("La tarea se agregó correctamente");
    setTasks([...tasks, response]);
  };

  const deleteData = async (id) => {
    const data = await fetch(`${URL}/${id}`, { method: "DELETE" });

    const response = await data.json();

    if (response.isError) {
      toast.error(response.message);
      return;
    }

    toast.success("La tarea se eliminó correctamente");
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getData = async () => {
    const data = await fetch(URL);
    const tasksList = await data.json();
    setTasks(tasksList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completed,
        newTask,
        deleteData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
