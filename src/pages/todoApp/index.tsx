import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector, todoSelector } from "../../selectors";
import { addTaskAction } from "../../slices/todo";

const TodoApp = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const authState = useSelector(authSelector);
  const todoState = useSelector(todoSelector);
  console.log(todoState, "todoState");

  const dispatch = useDispatch();

  if (!authState.token) {
    return <Navigate to="/login" state={{ from: "/todo" }} replace />;
  }

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(event.target.value);
  };
  const onAddClick = () => {
    dispatch(addTaskAction({ description: todoDescription }));
    setTodoDescription("")
  };

  return (
    <div className="w-full flex flex-col border-2 p-4 justify-center items-center">
      <h1 className="font-bold text-gray-500">Todo-Homepage</h1>
      <div className="flex flex-col w-full p-10">
        <h2>Add Todo</h2>
        <form className="w-full">
          <input
            value={todoDescription}
            onChange={handleTodoChange}
            className="border p-1 pl-2 bg-orange-100 w-full"
            type="text"
          />
          <button type="button" onClick={onAddClick}>
            Add
          </button>
        </form>

        <div className="mt-10">
          {todoState?.todos?.map((item) => {
            return (
              <div key={item._id} className="flex text-purple-800 p-2 bg-gray-100 justify-between h-40 border">
                <p>{item.description}</p>
                <div className="text-white">
                  <button className="mr-5 p-2 bg-blue-400 hover:bg-blue-600 border border-gray-300">
                    Done
                  </button>
                  <button className="border p-2 bg-red-400 hover:bg-red-600  border-gray-300">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
