import React from 'react';
import './App.css';
import Search from './components/searchComponent/search';
import Result from './components/resultComponent/result';
import ErrorBoundary from './components/ErrorBoundary';

const searchKey = 'searchString';

class App extends React.Component {
  state = {
    searchString: localStorage.getItem(searchKey) ?? '',
  };

  handleSearch = (value: string): void => {
    this.setState({ searchString: value });
    localStorage.setItem(searchKey, value);
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <Search
            onSearch={this.handleSearch}
            searchString={this.state.searchString}
          />
          <Result searchString={this.state.searchString} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
