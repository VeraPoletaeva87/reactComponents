import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginationComponent/pagination';
import './result.css';
import Item from '../itemComponent/item';
import Loader from '../loader/loader';

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
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const urlBase = 'https://stapi.co/api/v2/rest/book/search';

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
    (searchString: string, pageNumber: string, pageLimit: string) => {
      setIsLoading(true);
      const params = new URLSearchParams({ search: searchString });
      const paramsString = params.toString();
      let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
      url = url + `?pageNumber=${pageNumber}&pageSize=${pageLimit}`;
      fetch(url)
        .then((response) => response.json())
        .then((itemList) => {
          setItems(itemList.books);
          setIsLoading(false);
        });
    },
    []
  );

  // calculate the page number
  useEffect(() => {
    fetch(urlBase)
      .then((response) => response.json())
      .then((itemList) => {
        setTotalPages(Math.ceil(itemList.books.length / pageLimit));
        setCurrentPage(1);
      });
  }, [pageLimit]);

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
      )}
    </div>
  );
}

export default Result;
