import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Detail from './components/detailComponent/detail';
import Home from './components/homeComponent/home';
import ErrorPage from './components/errorPage/error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/details/:id" element={<Detail />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
