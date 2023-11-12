import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './detail.css';
import { BookItem, beerApi } from './detail-api';

function Detail() {
  const [item, setItem] = useState<BookItem>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const { id } = state;

  const loadData = useCallback(async (id: number) => {
    setIsLoading(true);
    const result = await beerApi(id);
    setItem(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData(id);
  }, [id, loadData]);

  const closeHandler = () => {
    navigate(`/`);
  };

  return (
    <div data-testid="details-panel">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="detail-block">
          <h1>Beer details:</h1>
          <h2 data-testid="detail-name">name: {item?.name}</h2>
          <div className="bold">Description</div>
          <div
            className="detail-description margin-left-small"
            data-testid="detail-description"
          >
            {item?.description}
          </div>
          <div className="bold">Tagline</div>
          <div className="margin-left-small" data-testid="detail-tagline">
            {item?.tagline}
          </div>
          <button
            data-testid="detail-close-button"
            className="close"
            onClick={closeHandler}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Detail;
