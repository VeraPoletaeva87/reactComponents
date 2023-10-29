import React, { ChangeEvent } from 'react';
import './search.css';

class Search extends React.Component<{
  searchString: string;
  onSearch: (value: string) => void;
}> {
  state = {
    searchString: '',
  };

  setSearch = (value: string) => {
    this.setState({ searchString: value });
  };

  componentDidMount() {
    this.setSearch(this.props.searchString);
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setSearch(e.target.value);
  };

  hadleSearchClick = (): void => {
    this.props.onSearch(this.state.searchString);
  };

  render() {
    return (
      <div className="search-block">
        <input
          type="search"
          id="search"
          value={this.state.searchString}
          onChange={this.handleInputChange}
        />
        <button onClick={this.hadleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Search;
