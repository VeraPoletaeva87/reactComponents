import React, { ChangeEvent, useCallback, useEffect } from 'react';
import './search.css';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { changSearch } from '../../features/searchSlice';

interface SearchProps {
  onSearch: (value: string) => void;
}

function Search(props: SearchProps) {
  const searchString = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  useEffect(() => {}, [searchString]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changSearch(e.target.value));
  }, []);

  const hadleSearchClick = useCallback(() => {
    props.onSearch(searchString);
  }, [props, searchString]);

  return (
    <div className="search-block">
      <input
        className="search-field"
        type="search"
        data-testid="search-input"
        id="search"
        value={searchString}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        data-testid="search-button"
        onClick={hadleSearchClick}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
