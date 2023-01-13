import { useEffect, useState } from "react";
import {
  BsCircleFill,
  BsCheckCircleFill,
  BsCalendar3,
  BsXLg,
} from "react-icons/bs";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const URL = "https://taskapp-backend-production.up.railway.app/task";
  const date = new Date();
  const formatDate =
    date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

  const getData = async () => {
    const data = await fetch(URL);
    const tasks = await data.json();
    setTask(tasks);
  };

  const deleteData = async (id) => {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    toast.success('La tarea se eliminó correctamente');
    getData();
  };

  const completed = async (id, taskState) => {
    const raw = JSON.stringify({ completed: taskState });
    const response = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    });
    const responseJson = response.json();
    console.log(responseJson);
    taskState == "true" ? toast.success("¡Genial! Una tarea menos para ti") : toast(`La tarea se marcó como pendiente`);
    getData();
  };

  const clearInputs = () => {
    setTaskTitle("");
    setTaskDescription("");
  };

  const newTask = async (name, description) => {
    const raw = JSON.stringify({
      name: name,
      description: description,
      date: formatDate,
      completed: "false",
    });
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    });
    const responseJson = response.json();
    console.log(responseJson);
    clearInputs();
    toast.success("La tarea se agregó correctamente")
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center space-y-3 py-3 w-full justify-center border-b-[2px] border-b-[#333361] md:border-b-[3px] md:space-x-6">
        <RiAddCircleFill
          className="text-4xl text-[#3a8ad1] cursor-pointer hover:text-[#3f9ae9] absolute top-3 right-20 xl:right-[550px]"
          onClick={() =>
            taskTitle !== "" || taskDescription !== ""
              ? newTask(taskTitle, taskDescription)
              : toast.warning("Ingresa el título y la descripción para poder guardar")
          }
        />
        <div className="bg-[#202042] py-3 w-80 px-3 rounded-full flex items-center md:w-[400px] flex-col ">
          <input
            className="bg-transparent mx-1 border-none w-full outline-none md:text-base"
            type="text"
            placeholder="Añade el título"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className="bg-[#202042] py-3 w-80 px-3 rounded-full flex items-center md:w-[400px] flex-col ">
          <input
            className="bg-transparent mx-1 border-none w-full outline-none md:text-base"
            type="text"
            placeholder="Añade la descripción"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? newTask(taskTitle, taskDescription) : ""}
          />
        </div>
      </div>
      <p className="px-4 uppercase text-xs tracking-widest md:text-lg my-2">
        Lista de tareas
      </p>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        {task.map((t) => (
          <div
            className="bg-[#414166] m-1 rounded-xl flex items-center justify- h-24"
            key={t.id}
          >
            {t.completed === "true" ? (
              <BsCheckCircleFill
                className="text-5xl mx-5 md:mx-8 cursor-pointer text-green-600"
                onClick={() => completed(t.id, "false")}
              />
            ) : (
              <BsCircleFill
                className="text-5xl mx-5 md:mx-8 cursor-pointer"
                onClick={() => completed(t.id, "true")}
              />
            )}
            <div className="h-full w-full flex flex-col justify-evenly">
              <h1
                className={`font-bold ${
                  t.completed === "true" ? "line-through" : ""
                }`}
              >
                {t.name}
              </h1>
              <p
                className={`text-sm  ${
                  t.completed === "true" ? "line-through" : ""
                }`}
              >
                {t.description}
              </p>
              <div className="flex text-sm items-center space-x-1">
                <BsCalendar3 className="text-base" />
                <p className="text-xs ">{t.date}</p>
              </div>
            </div>
            <BsXLg
              className="mr-4 text-2xl text-red-500 cursor-pointer md:mr-8"
              onClick={() => {
                const response = window.confirm(
                  "¿Estás seguro que deseas eliminar esta tarea?"
                );
                response ? deleteData(t.id, "DELETE") : "false";
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
