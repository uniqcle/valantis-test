import { useState, useEffect } from "react";
import styled from "styled-components";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import Pagination from "./Pagination";
import useValantisService from "../services/ValantisService";
import { paginate } from "../services/paginate";

const Wrapper = styled.div``;

const List = ({ offset }) => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(2);

  const { loading, error, getAllIds, getItemsByIds } = useValantisService();

  const onLoadedProductsList = (ids) => {
    getItemsByIds(ids).then((data) => {
      let uniqueObjArray = [
        ...new Map(data.map((item) => [item["id"], item])).values(),
      ];

      setProducts(uniqueObjArray);
    });

    //setProducts(products);
  };

  useEffect(() => {
    getAllIds(offset).then(onLoadedProductsList);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderItems = (products) => {
    return (
      <>
        <div className="row">
          <h3> </h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
                <th scope="col">Бренд</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.product}</td>
                  <td>{p.price}</td>
                  <td>{p.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const paginated = paginate(products, currentPage, pageSize);

  const spinner = loading ? <Spinner /> : null;
  const items = !loading && renderItems(paginated);
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <Wrapper>
      {errorMessage}
      {spinner}
      {items}

      <Pagination
        itemsCount={products.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default List;
