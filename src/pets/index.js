import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Row, Col, List, Typography, Divider } from 'antd';

class TaskList extends React.Component {
  state = { tasks: [], days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] };
  /**
  * @method componentDidMount
  * @description called after mounting the component
  */
  componentDidMount() {
    const { tasks } = this.props;
    this.setState({
      tasks,
    });
  }


  /**
  * @method onDragStart
  * @description handle drag start
  */
  onDragStart = evt => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  /**
  * @method onDragEnd
  * @description handle drag end
  */
  onDragEnd = evt => {
    evt.currentTarget.classList.remove("dragged");
  };

  /**
  * @method onDragEnter
  * @description handle drag enter
  */
  onDragEnter = evt => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  /**
  * @method onDragLeave
  * @description handle drag leave
  */
  onDragLeave = evt => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  /**
  * @method onDragOver
  * @description handle drag over
  */
  onDragOver = evt => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  /**
  * @method handle drop
  * @description handle drag over
  */
  onDrop = (evt, value) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let tasks = this.state.tasks;
    let updated = tasks.map(task => {
      if (task.id == data) task.done = value;
      return task;
    });
    this.setState({ tasks: updated });
  };

  /**
  * @method render 
  * @description render component
  */
  render() {
    const {days, tasks } = this.state;
    let pending = tasks.filter(t => !t.done);
    let done = tasks.filter(t => t.done);
    return (
    <div className="App">
      <header className="App-header">
        <h1>Pets list</h1>
       
        <div className="container">
            <div
            className="pending small-box"
            onDragLeave={e => this.onDragLeave(e)}
            onDragEnter={e => this.onDragEnter(e)}
            onDragEnd={e => this.onDragEnd(e)}
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, false)}
            >
            <h3>Pets list</h3>
            {pending.map(task => (
                <div
                className="task"
                key={task.name}
                id={task.id}
                draggable
                onDragStart={e => this.onDragStart(e)}
                onDragEnd={e => this.onDragEnd(e)}
                >
                {task.name}
               <div className="characters-thumb">
                    <img src={task.thumb} alt={`Thumb`} />
                </div>

                </div>
            ))}
            </div>
            <div className="done week-box">
            <h3>Week days</h3>
                {days.map(el => (
                    <div className='task'>
                        {el}
                    </div>
                ))}
            </div>
            
            <div
                className="done small-box"
                onDragLeave={e => this.onDragLeave(e)}
                onDragEnter={e => this.onDragEnter(e)}
                onDragEnd={e => this.onDragEnd(e)}
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => this.onDrop(e, true)}
            >
            <h3>Pets lists</h3>
            {done.map(task => (
                <div
                className="task"
                key={task.name}
                id={task.id}
                draggable
                onDragStart={e => this.onDragStart(e)}
                onDragEnd={e => this.onDragEnd(e)}
                >
                 {task.name}
                <div className="characters-thumb">
                    <img src={task.thumb} alt={`Thumb`} />
                </div>
                </div>
            ))}
            </div>
        </div>
      </header>
    </div>
    );
  }
}

export default TaskList;