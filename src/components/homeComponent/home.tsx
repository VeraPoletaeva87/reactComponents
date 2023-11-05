import { useState } from 'react';
import './home.css';
import Search from '../searchComponent/search';
import Result from '../resultComponent/result';
import { Outlet, useNavigate } from 'react-router-dom';

const searchKey = 'searchString';

function Home() {
  const [searchString, setSearchString] = useState(
    localStorage.getItem(searchKey) ?? ''
  );

  const navigate = useNavigate();

  const mainClickHandler = () => {
    navigate(`/`);
  };

  const handleSearch = (value: string): void => {
    setSearchString(value);
    localStorage.setItem(searchKey, value);
  };

  return (
    <div className="flex">
      <div onClick={mainClickHandler} className="main-panel">
        <Search onSearch={handleSearch} searchString={searchString} />
        <Result searchString={searchString} />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
