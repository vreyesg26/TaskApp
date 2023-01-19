import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  BsCircleFill,
  BsCheckCircleFill,
  BsCalendar3,
  BsXLg,
} from "react-icons/bs";

const TaskCard = ({ data }) => {
  const { completed, deleteData } = useContext(TaskContext);

  return (
    <div
      className="bg-[#414166] m-1 rounded-xl flex items-center justify- h-24"
      key={data.id}
    >
      {data.completed === "true" ? (
        <BsCheckCircleFill
          className="text-5xl mx-5 md:mx-8 cursor-pointer text-green-600"
          onClick={() => completed(data.id, "false")}
        />
      ) : (
        <BsCircleFill
          className="text-5xl mx-5 md:mx-8 cursor-pointer"
          onClick={() => completed(data.id, "true")}
        />
      )}
      <div className="h-full w-full flex flex-col justify-evenly">
        <h1
          className={`font-bold ${
            data.completed === "true" ? "line-through" : ""
          }`}
        >
          {data.name}
        </h1>
        <p
          className={`text-sm  ${data.completed === "true" ? "line-through" : ""}`}
        >
          {data.description}
        </p>
        <div className="flex text-sm items-center space-x-1">
          <BsCalendar3 className="text-base" />
          <p className="text-xs ">{data.date}</p>
        </div>
      </div>
      <BsXLg
        className="mr-4 text-2xl text-red-500 cursor-pointer md:mr-8"
        onClick={() => {
          const response = window.confirm(
            "¿Estás seguro que deseas eliminar esta tarea?"
          );
          response ? deleteData(data.id, "DELETE") : "false";
        }}
      />
    </div>
  );
};

export default TaskCard;
