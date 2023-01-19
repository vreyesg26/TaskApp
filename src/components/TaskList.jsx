import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { RiAddCircleFill } from "react-icons/ri";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      <p className="px-4 uppercase text-xs tracking-widest md:text-lg my-2">
        Lista de tareas
      </p>
      {tasks != 0 ? (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t, i) => (
            <TaskCard key={i} data={t} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-lg mt-12 text-[#3f9ae9]">
            No hay tareas para mostrar
          </h1>
          <div className="hidden md:flex md:text-xs md:items-center md:justify-center md:text-center">
            <p>
              Escribe un título y una descripción para tu tarea y luego presiona
              el botón
            </p>
            <RiAddCircleFill className="text-[#3a8ad1] hover:text-[#3f9ae9] text-lg mx-1" />
            <p>para guardar</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
