import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";

const TaskHeader = ({ taskTitle, taskDescription, setTaskTitle, setTaskDescription }) => {
  const { newTask } = useContext(TaskContext);
  const clearInputs = () => {
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <h1 className="uppercase text-2xl py-3 font-extrabold text-center text-gray-300 md:text-3xl">
        Tareas
      </h1>
      <RiAddCircleFill
        className="text-4xl text-[#3a8ad1] cursor-pointer hover:text-[#3f9ae9] "
        onClick={() =>
          taskTitle !== "" || taskDescription !== ""
            ? newTask(taskTitle, taskDescription) && clearInputs()
            : toast.warning(
                "Ingresa el título y la descripción para poder guardar"
              )
        }
      />
    </div>
  );
};

export default TaskHeader;
