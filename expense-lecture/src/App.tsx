import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './expense-tracker/components/LoginPage';
import RegisterPage from './expense-tracker/components/RegisterPage';
import ExpensePage from './expense-tracker/components/ExpensePage';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/expense' element={<ExpensePage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
