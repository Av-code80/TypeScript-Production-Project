import { Login, Register, TodoApp } from '../pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

  
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
};

export default AppRoutes;
