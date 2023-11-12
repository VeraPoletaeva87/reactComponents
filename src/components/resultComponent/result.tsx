import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginationComponent/pagination';
import './result.css';
import Item from '../itemComponent/item';
import Loader from '../loader/loader';
import { AppContext, AppContextType } from '../../AppContext';
import { ListItem, listApi } from './result-api';

function Result() {
  const { searchString, items, setItems } =
    useContext<AppContextType>(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const urlBase = 'https://api.punkapi.com/v2/beers';

  const navigate = useNavigate();

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setPageLimit(+e?.target.value);
    },
    []
  );

  const itemClickHandler = (id: number) => {
    navigate(`/details/${id}`, { state: { id } });
  };

  const loadData = useCallback(
    async (searchString: string, pageNumber: string, pageLimit: string) => {
      setIsLoading(true);
      const params = new URLSearchParams({ beer_name: searchString });
      const paramsString = params.toString();
      let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
      url = searchString
        ? url + `&page=${pageNumber}&per_page=${pageLimit}`
        : url + `?page=${pageNumber}&per_page=${pageLimit}`;
      const result = await listApi(url);
      setItems(result);
      setIsLoading(false);
    },
    []
  );

  const loadBase = useCallback(async () => {
    const result = await listApi(urlBase);
    setTotalPages(Math.ceil(result.length / pageLimit));
    setCurrentPage(1);
  }, [pageLimit]);

  // calculate the page number
  useEffect(() => {
    loadBase();
  }, [loadBase]);

  // load items
  useEffect(() => {
    loadData(searchString, currentPage.toString(), pageLimit.toString());
  }, [loadData, searchString, currentPage, pageLimit]);

  return (
    <div>
      <span className="margin">Items per page:</span>
      <select value={pageLimit} onChange={handleItemsPerPageChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
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
          {items?.length ? (
            items?.map((item: ListItem) => (
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
