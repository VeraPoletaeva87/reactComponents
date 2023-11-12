import { Routes, Route } from 'react-router-dom';
import Detail from '../detailComponent/detail';
import Home from '../homeComponent/home';
import ErrorPage from '../errorPage/error';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/details/:id" element={<Detail />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default RoutesComponent;
