import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Uncontrolled from './forms/uncontrolled/form';
import ErrorPage from './components/errorPage';
import Home from './components/home';
import Controlled from './forms/controlled/form';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/uncontrolled" element={<Uncontrolled />} />
          <Route path="/controlled" element={<Controlled />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;