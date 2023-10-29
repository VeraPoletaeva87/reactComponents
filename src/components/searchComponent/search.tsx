import React, { ChangeEvent } from 'react';
import './search.css';

class Search extends React.Component<{
  searchString: string;
  onSearch: (value: string) => void;
}> {
  state = {
    searchString: '',
  };

  componentDidMount() {
    this.setState({ searchString: this.props.searchString });
  }

  onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchString: e.target.value });
  };

  onClick = (): void => {
    this.props.onSearch(this.state.searchString);
  };

  render() {
    return (
      <div className="search-block">
        <input
          type="search"
          id="search"
          value={this.state.searchString}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Search</button>
      </div>
    );
  }
}

export default Search;
