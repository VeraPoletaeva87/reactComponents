import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginationComponent/pagination';
import './result.css';
import Item from '../itemComponent/item';
import Loader from '../loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changPageLimit } from '../../features/pageLimitSlice';
import { changeListLoaded } from '../../features/listLoadedSlice';
import { ListItem, useGetBeersQuery } from '../../features/apiSlice';

function Result() {
  const searchString = useSelector((state: RootState) => state.search.value);
  const pageLimit = useSelector((state: RootState) => state.pageLimit.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const urlBase = 'https://api.punkapi.com/v2/beers';
  const params = new URLSearchParams({ beer_name: searchString });
  const paramsString = params.toString();
  let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
  url = searchString
    ? url + `&page=${currentPage}&per_page=${pageLimit}`
    : url + `?page=${currentPage}&per_page=${pageLimit}`;

  const { data, isLoading } = useGetBeersQuery({ url, limit: pageLimit });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      dispatch(changPageLimit(+e?.target.value));
    },
    []
  );

  const itemClickHandler = (id: number) => {
    navigate(`/details/${id}`, { state: { id } });
  };

  useEffect(() => {
    dispatch(changeListLoaded(isLoading));
  }, [dispatch, isLoading]);

  const listApi = async (url: string): Promise<ListItem[]> => {
    const response = await fetch(url);
    const items = await response.json();
    return items as ListItem[];
  };

  const loadBase = useCallback(async () => {
    const result = await listApi(urlBase);
    setTotalPages(Math.ceil(result.length / pageLimit));
    setCurrentPage(1);
  }, [pageLimit]);

  // calculate the page number
  useEffect(() => {
    loadBase();
  }, [loadBase]);

  return (
    <div>
      <div className="page-limit-block">
        <span className="text">Items per page:</span>
        <select
          className="margin select-field"
          value={pageLimit}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageLimit={pageLimit}
        onPageChange={handlePageChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ul data-testid="list">
          {data?.length ? (
            data?.map((item: ListItem) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                clickHandler={itemClickHandler}
              />
            ))
          ) : (
            <h2 data-testid="empty-text">No items</h2>
          )}
        </ul>
      )}
    </div>
  );
}

export default Result;
