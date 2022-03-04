import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector, removeSelector, todoSelector } from "../../selectors";
import { addTaskAction, getAllTaskAction } from "../../slices/todo";

const TodoApp = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const authState = useSelector(authSelector);
  const todoState = useSelector(todoSelector);
  const removeState = useSelector(removeSelector);
  console.log(todoState.todos, "todos**");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTaskAction());
  }, []);

  if (!authState.token) {
    return <Navigate to="/login" state={{ from: "/todo" }} replace />;
  }

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(event.target.value);
  };

  const onAddClick = () => {
    dispatch(addTaskAction({ description: todoDescription }));
    dispatch(getAllTaskAction()); // get all item after adding new item
    setTodoDescription("");
  };

  const onRemoveClick = () => {
    console.log("remove");
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
          <button
            type="button"
            className="p-2 mt-1 bg-green-300 rounded hover:bg-green-500 hover:text-white border border-gray-300"
            onClick={onAddClick}
          >
            Add
          </button>
        </form>

        <div className="mt-10 font-semibold">
          {todoState?.todos?.map((item) => {
            return (
              <div
                key={item._id}
                className="flex text-purple-800 p-4 bg-gray-100 justify-between h-15 border"
              >
                <p className="pt-1">{item.description}</p>
                <div>
                  <button className="mr-5 text-black p-2 hover:text-white bg-blue-400 rounded hover:bg-blue-600 border border-gray-300">
                    Done
                  </button>
                  <button
                    onClick={onRemoveClick}
                    className="border text-black hover:text-white p-2 bg-red-400 rounded hover:bg-red-600  border-gray-300"
                  >
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
