import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./pets";
import { TASKS } from "./pets/Constant";
import ReactDnd from './pets/ReactDnd'
import 'antd/dist/antd.css';
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <TaskList tasks={TASKS} />
      {/* <ReactDnd/> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
