import { useState, useContext } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { newTask } = useContext(TaskContext);

  const clearInputs = () => {
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-3 py-3 w-full justify-center border-b-[2px] border-b-[#333361] md:border-b-[3px] md:space-x-6">
      <RiAddCircleFill
        className="text-4xl text-[#3a8ad1] cursor-pointer hover:text-[#3f9ae9] absolute top-3 right-20 xl:right-[550px]"
        onClick={() =>
          taskTitle !== "" || taskDescription !== ""
            ? newTask(taskTitle, taskDescription) && clearInputs()
            : toast.warning(
                "Ingresa el título y la descripción para poder guardar"
              )
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
          onKeyPress={(e) =>
            e.key === "Enter" ? newTask(taskTitle, taskDescription) && clearInputs() : ""
          }
        />
      </div>
    </div>
  );
};

export default TaskForm;
