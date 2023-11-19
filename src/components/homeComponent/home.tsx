import './home.css';
import Search from '../searchComponent/search';
import Result from '../resultComponent/result';
import { Outlet, useNavigate } from 'react-router-dom';

const searchKey = 'searchString';

function Home() {
  const navigate = useNavigate();

  const mainClickHandler = () => {
    navigate(`/`);
  };

  const handleSearch = (value: string): void => {
    localStorage.setItem(searchKey, value);
  };

  //надо ли тут передавать строку поиска
  return (
    <div className="flex">
      <div onClick={mainClickHandler} className="main-panel">
        <Search onSearch={handleSearch} />
        <Result />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
