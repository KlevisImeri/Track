import Timer from "./Timer";
import ToDoList from "./ToDoList";

function App(){


  return(
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900">
      <div>
        <Timer studyDuration={10} restDuration={2} goal={8}></Timer>
      </div>
      <div>
        <ToDoList></ToDoList>
      </div>
    </div>
  )
}

export default App;