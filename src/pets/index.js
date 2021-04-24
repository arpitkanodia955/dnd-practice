import React from "react";

class TaskList extends React.Component {

  state = { list_item: [], days: this.props.week_days};

  /**
  * @method componentDidMount
  * @description called after mounting the component
  */
  componentDidMount() {
    const { list_item } = this.props;
    this.setState({
      list_item,
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
    let list_item = this.state.list_item;
    let updated = list_item.map(task => {
      if (task.id === data) task.day_index = value;
      return task;
    });
    this.setState({ list_item: updated });
  };

  /**
  * @method render 
  * @description render component
  */
  render() {
    const {days, list_item } = this.state;
    let pets_list = list_item.filter(t => t.day_index === '');
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
            onDrop={e => this.onDrop(e, '')}
            >
            <h3>Pets list</h3>
            {pets_list.map(pet => (
                <div
                  className="task"
                  key={pet.name}
                  id={pet.id}
                  draggable
                  onDragStart={e => this.onDragStart(e)}
                  onDragEnd={e => this.onDragEnd(e)}
                >
                {pet.name}
               <div className="characters-thumb">
                    <img src={pet.thumb} alt={`Thumb`} />
                </div>

                </div>
            ))}
            </div>
            {days.map(el => (
            <div
                className="done small-box"
                onDragLeave={e => this.onDragLeave(e)}
                onDragEnter={e => this.onDragEnter(e)}
                onDragEnd={e => this.onDragEnd(e)}
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => this.onDrop(e, el)}
            >
            <h3>{el}</h3>
            {list_item.filter(t => t.day_index === el).map((card,index) => (
                <div
                className="task"
                key={`${el}${index}`}
                id={card.id}
                draggable
                onDragStart={e => this.onDragStart(e)}
                onDragEnd={e => this.onDragEnd(e)}
                >
                 {card.name}
                <div className="characters-thumb">
                    <img src={card.thumb} alt={`Thumb`} />
                </div>
                </div>
            ))}
            </div> ))}
        </div>
      </header>
    </div>
    );
  }
}

export default TaskList;