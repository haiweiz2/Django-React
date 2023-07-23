import PropTypes from "prop-types";

import "./style.css";
import { useContext } from "react";
import { ProductContext } from "../pages/ProductPage";

const ProductItem = ({ product }) => {
  const { dispatch } = useContext(ProductContext);

  const url = `http://localhost:8000${product.image}`;
  const handleDeleteClick = () => {
    try {
      fetch(`http://localhost:8000/api/products/${product.id}/delete`, {
        method: "DELETE",
      }).then((data) => console.log(data));
      dispatch({ type: "DELETE", id: product.id });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="product-item">
      <img src={url} alt={product.name} />
      <div className="product-details">
        <h3>{product.product_name}</h3>
        <p>{product.description}</p>
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.any,
};
export default ProductItem;
