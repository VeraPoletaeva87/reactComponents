import React from 'react';
import './App.css';

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
    return <div>test</div>;
  }
}

export default App;