import { ChangeEvent, useState } from "react";
import { Task } from "./interfaces";
import "./App.css";

const App: React.FC = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({} as Task);
  function addTaskHandler() {
    setTasksList([...tasksList, task]);
    setTask({name: ""} as Task);
  }
  function deleteTaskHandler(index: number) {
    setTasksList(
      tasksList.filter((task:Task, i) => {
        return i !== index;
      })
    );
  }
  function doneTaskHandler(index:number) {
    setTasksList(tasksList.map((task:Task, i:number)=>{
      if (i === index) {
        return { ...task, done: true };
      }
      return task;
    }) );
  }
  console.log(tasksList)
  return (
    <div className="App">
      <div className="contentContainer">
        <div className="title">
          <h1>Todo List</h1>
          <p>A simple to-do list using React + Typescript</p>
        </div>
        <div className="tasksContainer">
          {tasksList.map((task:Task, index:number) => {
            return (
              <div className="checkTask" key={index}>
                <label
                  className={task.done ? "done" : ""}
                >
                  {task.name}
                </label>
                {!task.done && ( <i
                  className="fa-regular fa-square-check"
                  onClick={() => {
                    doneTaskHandler(index)
                  }}
                ></i> )}
                
                <i
                  className="fa-solid fa-trash delete"
                  onClick={() => {
                    deleteTaskHandler(index);
                  }}
                ></i>
              </div>
            );
          })}
        </div>
        <div className="addingTask">
          <input
            type="text"
            value={task.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTask({name: e.target.value, done: false});
            }}
          />
          <button onClick={addTaskHandler}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default App;
