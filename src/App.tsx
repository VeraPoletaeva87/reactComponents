import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Detail from './components/detailComponent/detail';
import Home from './components/homeComponent/home';
import ErrorPage from './components/errorPage/error';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/details/:id" element={<Detail />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
