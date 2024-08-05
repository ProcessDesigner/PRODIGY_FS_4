/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../action/productAction";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { useAlert } from "react-alert";

function Products() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert()
  const categories = [
    "Laptop",
    "Tops",
    "Footwear",
    "Attire",
    "Camera",
    "Smartphone"
  ]

  const [currentPage, setcurrentpage] = useState(1);
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)

  const { products, error, loading, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const keywords = id;

  const setcurrentpageNo = (pageNumber) => {
    setcurrentpage(pageNumber);
  };

  const [price, setprice] = useState([0, 25000])
  function priceHandle(event, newPrice) {
    setprice(newPrice)
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError());
    }
    dispatch(getProduct(keywords, currentPage, price, category, rating));
  }, [dispatch, keywords, currentPage, price, category, rating]);

  let count = filteredProductsCount || productsCount;

  return (
    <Fragment>
      <h2>Products</h2>
      <div>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div>
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandle}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating);
            }}
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
          />
        </fieldset>
      </div>

      <div>
        {resultPerPage < count && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={count}
            onChange={setcurrentpageNo}
            nextPageText="Next"
            prevPageText="Last"
            firstPageText="1st"
            linkClass="page-link"
            itemClass="page-item"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </Fragment>
  );
}

export default Products;