import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const URL = "https://taskapp-backend-production.up.railway.app/task";
  const headers = { "Content-Type": "application/json" };
  const date = new Date();

  const completed = async (id, taskState) => {
    const raw = JSON.stringify({ completed: taskState });
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: raw,
    });
    taskState == "true"
      ? toast.success("¡Genial! Una tarea menos para ti")
      : toast(`La tarea se marcó como pendiente`);
  };

  const newTask = async (name, description) => {
    const raw = JSON.stringify({
      name: name,
      description: description,
      date:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      completed: "false",
    });
    await fetch(URL, {
      method: "POST",
      headers,
      body: raw,
    });
    toast.success("La tarea se agregó correctamente");
  };

  const deleteData = async (id) => {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    toast.success("La tarea se eliminó correctamente");
  };

  const getData = async () => {
    const data = await fetch(URL);
    const tasksList = await data.json();
    setTasks(tasksList);
  };

  useEffect(() => {
    getData();
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completed,
        newTask,
        deleteData,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
