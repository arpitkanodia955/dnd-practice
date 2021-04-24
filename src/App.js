import React from "react";
import ReactDOM from "react-dom";
import PetsList from "./pets";
import { LIST_ITEM, WEEK_DAYS } from "./pets/Constant";
import "./App.css";
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div className="App">
      <PetsList list_item={LIST_ITEM} week_days={WEEK_DAYS}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
