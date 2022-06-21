import {useEffect, useState} from "react";
import {todoAPI} from "./API/api"

import "./App.css";

// button-group
const buttons = [
    {
        type: "all",
        label: "All",
    },
    {
        type: "active",
        label: "Active",
    },
    {
        type: "done",
        label: "Done",
    },
    {
        type: "completed",
        label: "Completed",
    },
];

function App() {
    const [itemToDo, setItemToDo] = useState("");
    const handleToDoChange = (event) => {
        setItemToDo(event.target.value);
    };

    const [searchToDo, setSearchToDo] = useState("")
    const handleToDoSearch = (event) => {
        setSearchToDo(event.target.value);
    };

    const [items, setItems] = useState([]);

    const [completedTD, setCompletedTD] = useState([])

    const [filterType, setFilterType] = useState("all");

    const handleDeleteItem = ({id}) => {
        todoAPI.deleteTask(id, setItems)
    }

    const handleItemReComplete = (item) => {
        console.log(item)
        todoAPI.reComplete(item, setItems, setCompletedTD)
    };

    const handleItemComplete = ({id}) => {
        todoAPI.complete(id, setItems, setCompletedTD)
    };

    const handleAddItem = () => {
        let newTask = {
            content: itemToDo,
            project_id: 2277511004,
        }
        todoAPI.addTask(newTask, setItems, items)
        setItemToDo("");
    };

    const handleItemDone = (item) => {
        console.log(item)
        todoAPI.doneTask(item, setItems)
    };

    const handleFilterChange = ({type}) => {
        setSearchToDo("")
        setFilterType(type);
    };

    const moreToDo = items.filter((item) => item.priority === 1).length;

    const doneToDo = items.length - moreToDo;

    const filteredArray =
        filterType === "all"
            ? items.filter((item) => item.completed === false)
            : filterType === "done"
                ? items.filter((item) => item.priority === 2)
                : filterType === "completed"
                    ? completedTD.filter((item) => item) : items.filter((item) => item.priority === 1);


    useEffect(() => {
        todoAPI.getTasks(setItems)
        todoAPI.showCompleted(setCompletedTD)
    }, [searchToDo])

    return (
        <div className="todo-app">
            {/* App-header */}
            <div className="app-header d-flex">
                <h1>Todo List</h1>
                <h2>
                    {moreToDo} more to do, {doneToDo} done, {completedTD.length} completed
                </h2>
            </div>

            <div className="top-panel d-flex">
                {/* Search-panel */}
                <input
                    value={searchToDo}
                    type="text"
                    className="form-control search-input"
                    onChange={handleToDoSearch}
                    placeholder="type to search"
                />
                {/* Item-status-filter */}
                <div className="btn-group">
                    {buttons.map((item) => (
                        <button
                            key={item.type}
                            type="button"
                            className={`btn btn-info ${
                                filterType === item.type ? "" : "btn-outline-info"
                            }`}
                            onClick={() => handleFilterChange(item)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* List-group */}
            <ul className="list-group todo-list">
                {filteredArray.length > 0 &&
                    filteredArray.map((item) => (
                        <li key={item.id} className="list-group-item">
              <span className={`todo-list-item ${item.priority === 2 ? "done" : ""}`}>
                <span
                    className="todo-list-item-label"
                    onClick={() => handleItemDone(item)}
                >
                  {item.content}
                </span>

                <button
                    type="button"
                    onClick={() => handleItemComplete(item)}
                    className="btn btn-outline-success btn-sm float-right"
                >
                  <i className="fa fa-check"/>
                </button>

                  <button
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-outline-danger btn-sm float-right"
                  >
                  <i className="fa fa-trash-o"/>
                </button>

                  <button
                      type="button"
                      onClick={() => handleItemReComplete(item)}
                      className="btn btn-outline-success btn-sm float-right"
                  >
                  <i className="fa fa-refresh"/>
                </button>
              </span>
                        </li>
                    ))}
            </ul>

            <div className="item-add-form d-flex">
                <input
                    value={itemToDo}
                    type="text"
                    className="form-control"
                    placeholder="What needs to be done"
                    onChange={handleToDoChange}
                />
                <button className="btn btn-outline-secondary" onClick={handleAddItem}>
                    Add item
                </button>
            </div>
        </div>
    );
}

export default App;