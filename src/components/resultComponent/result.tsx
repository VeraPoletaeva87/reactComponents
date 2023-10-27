import React from 'react';
import './result.css';

interface Item {
  episode_id: number;
  title: string;
  opening_crawl: string;
}

class Result extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((itemList) => {
        this.setState({ items: itemList.results });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.items.map((item: Item) => (
            <li className="item" key={item.episode_id}>
              <div className="title">Title: {item.title}</div>
              <div className="description">
                Description: {item.opening_crawl}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Result;
