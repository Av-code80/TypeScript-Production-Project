import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector, todoSelector } from "../../selectors";
import {
  addTaskAction,
  deleteTaskAction,
  getAllTaskAction,
  updateTaskAction,
} from "../../slices/todo";
import cn from "classnames";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  completed: boolean;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TodoApp = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const [modifyItem, setModifyItem] = useState<Task>({} as Task);
  const authState = useSelector(authSelector);
  const todoState = useSelector(todoSelector);
  console.log(todoState.todos, "todos**");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTaskAction());
  }, [dispatch]);

  useEffect(() => {
    setModifyItem({} as Task);
  }, [todoState.todos]);

  if (!authState.token) {
    return <Navigate to="/login" state={{ from: "/todo" }} replace />;
  }

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(event.target.value);
  };

  const onAddClick = () => {
  
      dispatch(addTaskAction({ description: todoDescription, dispatch }));
      setTodoDescription("");
     
  };

  const onRemoveClick = (_id: string) => {
      dispatch(deleteTaskAction({ _id, dispatch }));
  };

  const onDoneClick = (item: Task) => {
    dispatch(
      updateTaskAction({
        _id: item._id,
        dispatch: dispatch,
        body: {
          completed: !item.completed,
        },
      })
    );
  };

  const onEditClick = (item: Task) => {
    setModifyItem(item);
  };

  const onCancelClick = () => {
    setModifyItem({} as Task);
  };

  const onSaveClick = (item: Task) => {
    dispatch(
      updateTaskAction({
        _id: item._id,
        dispatch,
        body: {
          description: modifyItem.description,
        },
      })
    );
  };

  return (
    <div className="flex flex-col border-2  justify-center items-center">
      <header className="w-screen h-20 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        <h1 className="font-bold my-6 text-center text-gray-50">
          Todo-Homepage
        </h1>
      </header>
      <div className="flex flex-col w-4/6 p-10">
        <h2 className="text-purple-800 font-bold">Add Todo</h2>
        <form className="w-full">
          <input
            value={todoDescription}
            onChange={handleTodoChange}
            className="border p-1 pl-2 hover:bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 w-full"
            type="text"
          />
          <button
            type="button"
            className={
              "p-4 mt-1 font-semibold bg-green-400 rounded hover:bg-green-200 hover:text-black text-white border border-gray-300"
            }
            onClick={onAddClick}
          >
            Add
          </button>
        </form>
        <div>
          <ToastContainer />
        </div>
        <div className="mt-10 font-semibold">
          {todoState?.todos?.map((item) => {
            return (
              <div
                key={item._id}
                className="flex text-purple-800 mb-2 p-4 rounded selection: bg-gray-50 justify-between h-15 border"
              >
                {modifyItem?._id !== item._id ? (
                  <p className={cn("pt-1", { "line-through": item.completed })}>
                    {item.description}
                  </p>
                ) : (
                  <input
                    className="p-2 hover:bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 "
                    value={modifyItem.description}
                    onChange={(event) =>
                      setModifyItem((prevState) => {
                        return {
                          ...prevState,
                          description: event.target.value,
                        };
                      })
                    }
                  />
                )}
                {modifyItem?._id === item._id ? (
                  <div>
                    <button
                      onClick={() => onSaveClick(item)}
                      className="mr-5 text-white p-2 hover:text-black bg-violet-400 rounded hover:bg-violet-300 border border-gray-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancelClick}
                      className="border text-white hover:text-black p-2 bg-pink-400 rounded hover:bg-pink-300  border-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => onDoneClick(item)}
                      className="mr-5 text-white p-2 hover:text-black bg-blue-400 rounded hover:bg-blue-300 border border-gray-300"
                    >
                      {!item.completed ? "Done" : "Undone"}
                    </button>
                    <button
                      onClick={() => onEditClick(item)}
                      className="mr-5 text-white p-2 hover:text-black bg-orange-400 rounded hover:bg-orange-300 border border-gray-300"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => onRemoveClick(item._id)}
                      className="border text-white hover:text-black p-2 bg-red-400 rounded hover:bg-red-300  border-gray-300"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TodoApp;
