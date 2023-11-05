import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './detail.css';

interface BookItem {
  title: string;
  publishedYear: string;
  novel: boolean;
  audiobook: boolean;
  productionNumber: string;
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
    const Url = `https://stapi.co/api/v2/rest/book/?uid=${uid}`;

    fetch(Url)
      .then((response) => response.json())
      .then((result) => {
        setItem(result.book);
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
          <h1>Book details:</h1>
          <h2>Title: {item?.title}</h2>
          <div className="description">Publish date: {item?.publishedYear}</div>
          <div>Novel: {item?.novel ? 'yes' : 'no'}</div>
          <div>Audiobook: {item?.audiobook ? 'yes' : 'no'}</div>
          <div>
            Production Number:{' '}
            {item?.productionNumber ? item.productionNumber : '--'}
          </div>
          <button className="close" onClick={closeHandler}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Detail;
