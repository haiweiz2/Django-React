import { createContext, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";

import "./pages.css";

export const ProductContext = createContext();

const Reducer = (products, action) => {
  switch (action.type) {
    case "FETCH": {
      return action.payload;
    }
    case "DELETE": {
      return products.filter((product) => product.id !== action.id);
    }
    case "SEARCH": {
      return action.searchItem
        ? action.payload.current.filter((product) =>
            product.product_name
              .toLowerCase()
              .includes(action.searchItem.toLowerCase())
          )
        : action.payload.current;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const initial = [];
const ProductsPage = () => {
  const [products, dispatch] = useReducer(Reducer, initial);
  const originalProductsRef = useRef([]);

  function handleSearchChange(event) {
    event.preventDefault();
    const searchItem = event.target.value.trim().toLowerCase();
    dispatch({ type: "SEARCH", payload: originalProductsRef, searchItem });
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/products/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH", payload: data });
        originalProductsRef.current = data;
      })
      .catch((error) => console.error("Error fetching data:", error));
    console.log(products);
  }, []);

  return (
    <ProductContext.Provider value={{ dispatch }}>
      <div className="heading-container">
        <h1 className="page-heading">All Products</h1>
      </div>
      <div className="search-container">
        <div className="search-box">
          <input
            className="searchbar"
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleSearchChange}
          ></input>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <Link to="/" className="return-button">
        Return
      </Link>
    </ProductContext.Provider>
  );
};

export default ProductsPage;
