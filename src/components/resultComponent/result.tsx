import React from 'react';
import './result.css';

interface Item {
  episode_id: number;
  title: string;
  opening_crawl: string;
}

class Result extends React.Component<{ searchString: string }> {
  state = {
    items: [],
    loaded: false,
  };

  loadData(): void {
    const params = new URLSearchParams({ search: this.props.searchString });
    const paramsString = params.toString();
    const Url = this.props.searchString
      ? `https://swapi.dev/api/films/?${paramsString}`
      : 'https://swapi.dev/api/films/';
    fetch(Url)
      .then((response) => response.json())
      .then((itemList) => {
        this.setState({ items: itemList.results });
        this.setState({ loaded: true });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: { searchString: string }) {
    if (prevProps.searchString !== this.props.searchString) {
      this.setState({ loaded: false });
      this.loadData();
    }
  }

  render() {
    return (
      <div>
        {this.state.loaded === false && <div id="loader"></div>}
        <ul>
          {this.state.items?.map((item: Item) => (
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
