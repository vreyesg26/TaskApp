import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      <p className="px-4 uppercase text-xs tracking-widest md:text-lg my-2">
        Lista de tareas
      </p>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        {tasks !== null ? tasks.map((t, i) => (
          <TaskCard key={i} data={t} />
        )) : console.log("No hay ni mierda")}
      </div>
    </>
  );
};

export default TaskList;
