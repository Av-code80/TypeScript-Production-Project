import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../selectors";

const TodoApp = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const authState = useSelector(authSelector);
  
  if (!authState.token) {
    return <Navigate to="/login" state={{ from: "/todo" }} replace />;
  }
  const onTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };
  const onAddClick = () => {};

  return (
    <div className="w-full flex flex-col border-2 p-4 justify-center items-center">
      <h1 className="font-bold text-gray-500">Todo-Homepage</h1>
      <div className="flex flex-col w-full p-10">
        <h2 >Add Todo</h2>
        <form className="w-full">
          <input
            value={todoDescription}
            onChange={onTodoChange}
            className="border bg-orange-100 w-full"
            type="text"
          />
          <button onClick={onAddClick}>Add</button>
        </form>

        <div className="mt-10">
          <div className="flex p-2 bg-gray-100 justify-between h-40 border">
            <p>This is a text</p>
            <div>
              <button className="mr-5">Done</button>
              <button>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
