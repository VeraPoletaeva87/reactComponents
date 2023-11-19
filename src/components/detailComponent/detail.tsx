import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeDetailLoaded } from '../../features/detailLoadedSlice';
import Loader from '../loader/loader';
import './detail.css';
import { useGetBeerByIdQuery } from '../../features/apiSlice';

function Detail() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();

  const { id } = state;
  const { data, isLoading } = useGetBeerByIdQuery(id);
  const item = data ? data[0] : null;

  useEffect(() => {
    dispatch(changeDetailLoaded(isLoading));
  }, [dispatch, isLoading]);

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
