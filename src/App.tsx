import React from 'react';
import './App.css';
import Search from './components/searchComponent/search';
import Result from './components/resultComponent/result';

class App extends React.Component {
  render() {
    return (
      <div>
        <Search />
        <Result />
      </div>
    );
  }
}

export default App;
