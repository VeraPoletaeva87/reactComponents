import React from 'react';

class Search extends React.Component {
  state = {
    searchString: '',
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ searchString: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <input
          type="search"
          id="search"
          value={this.state.searchString}
          onChange={this.onChange}
        />
        <button>Search</button>
      </div>
    );
  }
}

export default Search;
