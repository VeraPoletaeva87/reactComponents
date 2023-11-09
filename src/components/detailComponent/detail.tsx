import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './detail.css';

interface BookItem {
  name: string;
  description: string;
  tagline: string;
}

function Detail() {
  const [item, setItem] = useState<BookItem>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const { id } = state;

  const loadData = useCallback((id: number) => {
    setIsLoading(true);
    const uid = id.toString();
    const Url = `https://api.punkapi.com/v2/beers/?ids=${uid}`;

    fetch(Url)
      .then((response) => response.json())
      .then((result) => {
        setItem(result[0]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData(id);
  }, [id, loadData]);

  const closeHandler = () => {
    navigate(`/`);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="detail-block">
          <h1>Beer details:</h1>
          <h2>name: {item?.name}</h2>
          <div className="bold">Description</div>
          <div className="detail-description margin-left-small">
            {item?.description}
          </div>
          <div className="bold">Tagline</div>
          <div className="margin-left-small">{item?.tagline}</div>
          <button className="close" onClick={closeHandler}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Detail;
