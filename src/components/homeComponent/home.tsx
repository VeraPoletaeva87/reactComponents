import { useState } from 'react';
import './home.css';
import Search from '../searchComponent/search';
import Result from '../resultComponent/result';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const searchKey = 'searchString';

interface Item {
  id: number;
  name: string;
  description: string;
}

function Home() {
  const [searchString, setSearchString] = useState(
    localStorage.getItem(searchKey) || ''
  );
  const [items, setItems] = useState<Item[]>([]);

  const navigate = useNavigate();

  const mainClickHandler = () => {
    navigate(`/`);
  };

  const handleSearch = (value: string): void => {
    setSearchString(value);
    localStorage.setItem(searchKey, value);
  };

  //надо ли тут передавать строку поиска
  return (
    <AppContext.Provider
      value={{ searchString, setSearchString, items, setItems }}
    >
      <div className="flex">
        <div onClick={mainClickHandler} className="main-panel">
          <Search onSearch={handleSearch} />
          <Result />
        </div>
        <Outlet />
      </div>
    </AppContext.Provider>
  );
}

export default Home;
