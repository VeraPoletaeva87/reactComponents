import React from 'react';
import './App.css';
import Search from './components/searchComponent/search';
import Result from './components/resultComponent/result';

class App extends React.Component {
  state = {
    searchString: '',
  };

  handleSearch = (value: string): void => {
    this.setState({ searchString: value });
  };

  render() {
    return (
      <div>
        <Search
          onSearch={this.handleSearch}
          searchString={this.state.searchString}
        />
        <Result searchString={this.state.searchString} />
      </div>
    );
  }
}

export default App;
