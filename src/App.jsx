import { TaskForm, TaskHeader, TaskList} from "./components";

function App() {
  return (
    <div className="text-white">
      <TaskHeader />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
