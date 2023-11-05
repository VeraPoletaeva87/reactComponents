import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './search.css';

interface SearchProps {
  searchString: string;
  onSearch: (value: string) => void;
}

function Search(props: SearchProps) {
  const { searchString = '' } = props;
  const [search, setSearch] = useState(searchString);

  useEffect(() => {
    setSearch(searchString);
  }, [searchString]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const hadleSearchClick = useCallback(() => {
    props.onSearch(search);
  }, [props, search]);

  return (
    <div className="search-block">
      <input
        type="search"
        id="search"
        value={search}
        onChange={handleInputChange}
      />
      <button onClick={hadleSearchClick}>Search</button>
    </div>
  );
}

export default Search;
