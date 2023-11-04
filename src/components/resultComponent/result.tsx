import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginationComponent/pagination';
import './result.css';
import Item from '../itemComponent/item';

interface Item {
  uid: number;
  title: string;
  publishedYear: string;
}

interface ListProps {
  searchString: string;
}

function Result(props: ListProps) {
  const { searchString = '' } = props;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setPageLimit(+e?.target.value);
      setCurrentPage(1);
    },
    []
  );

  const getPagesCount = () => {
    fetch('https://stapi.co/api/v2/rest/book/search')
      .then((response) => response.json())
      .then((itemList) => {
        setTotalPages(Math.ceil(itemList.books.length / pageLimit));
      });
  };

  const itemClickHandler = (id: number) => {
    navigate(`/details/:${id}`, { state: { id } });
  };

  const loadData = useCallback(
    (searchString: string, currentPage: number, pageLimit: number) => {
      setIsLoading(true);
      const params = new URLSearchParams({ search: searchString });
      const paramsString = params.toString();
      let Url = searchString
        ? `https://stapi.co/api/v2/rest/book/search?${paramsString}`
        : 'https://stapi.co/api/v2/rest/book/search';
      Url = Url + `?pageNumber=${currentPage}&pageSize=${pageLimit}`;
      fetch(Url)
        .then((response) => response.json())
        .then((itemList) => {
          setItems(itemList.books);
          setIsLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    getPagesCount();
    loadData(searchString, currentPage, pageLimit);
  }, [loadData, searchString, currentPage, pageLimit]);

  return (
    <div>
      {isLoading && <div id="loader"></div>}

      {!isLoading && (
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
          <ul>
            {items?.map((item: Item) => (
              <Item
                key={item.uid}
                uid={item.uid}
                title={item.title}
                publishedYear={item.publishedYear}
                clickHandler={itemClickHandler}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Result;
