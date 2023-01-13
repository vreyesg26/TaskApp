import TaskList from './components/TaskList';

function App() {
  return (
    <div className="text-white h-screen w-screen">
      <h1 className="uppercase text-2xl py-3 font-extrabold text-center text-gray-300 md:text-3xl">
        Task List
      </h1>
      <TaskList />
    </div>
  );
}

export default App;
