import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskHeader from "./TaskHeader";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { newTask } = useContext(TaskContext);

  const clearInputs = () => {
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <>
      <TaskHeader
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        setTaskTitle={setTaskTitle}
        setTaskDescription={setTaskDescription}
      />
      <div
        className="flex flex-col md:flex-row items-center justify-center w-full 
             space-y-3 md:space-y-0 md:space-x-6 py-3 
             border-b-[2px] md:border-b-[3px] border-b-[#333361]"
      >
        <div
          className="bg-[#202042] py-3 px-3 w-80 md:w-[400px] rounded-full 
                  flex items-center"
        >
          <input
            className="bg-transparent mx-1 border-none w-full outline-none text-sm md:text-base"
            type="text"
            placeholder="Añade el título"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>

        <div
          className="bg-[#202042] py-3 px-3 w-80 md:w-[400px] rounded-full 
                  flex items-center"
        >
          <input
            className="bg-transparent mx-1 border-none w-full outline-none text-sm md:text-base"
            type="text"
            placeholder="Añade la descripción"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter"
                ? newTask(taskTitle, taskDescription) && clearInputs()
                : ""
            }
          />
        </div>
      </div>
    </>
  );
};

export default TaskForm;
