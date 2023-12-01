import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Uncontrolled from './forms/uncontrolled/form';
import ErrorPage from './components/errorPage';
import Home from './components/home/home';
import Controlled from './forms/controlled/form';
import { Provider } from 'react-redux';
import { store } from '../store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uncontrolled" element={<Uncontrolled />} />
          <Route path="/controlled" element={<Controlled />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
